import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { ColorConv, CvType, Imgproc, Core } from './constants';
import { CvScalar, CvPoint, CvSize, CvRect } from './coretypes';
import { Mat, MatOfInt, MatOfFloat } from './mats';
import { CvImage } from './cvimage';
import { findNodeHandle } from 'react-native';
import RNOpencv3 from './spec/turbomodule/NativeRNOpencv3';
import CVCameraModule from './spec/turbomodule/NativeCVCameraModule';
import CvCameraView from './spec/fabric/CvCameraViewNativeComponent';

var RNFS = require('react-native-fs');

const CvCamera = React.forwardRef((props, ref) => {
  const cameraRef = useRef(null);

  const setOverlay = overlayMat => {
    if (cameraRef.current) {
      const options = { overlayMat: overlayMat };
      cameraRef.current.setOverlay?.(
        options,
        findNodeHandle(cameraRef.current),
      );
    }
  };

  const takePicture = async filename => {
    const outputFilename = RNFS.DocumentDirectoryPath + '/' + filename;
    const pictureOptions = { filename: outputFilename };
    try {
      return await cameraRef.current?.takePicture?.(
        pictureOptions,
        findNodeHandle(cameraRef.current),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const startRecording = filename => {
    const outputFilename = RNFS.DocumentDirectoryPath + '/' + filename;
    const pictureOptions = { filename: outputFilename };
    cameraRef.current?.startRecording?.(
      pictureOptions,
      findNodeHandle(cameraRef.current),
    );
  };

  const stopRecording = async () => {
    try {
      return await cameraRef.current?.stopRecording?.(
        findNodeHandle(cameraRef.current),
      );
    } catch (e) {
      console.error(e);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      setOverlay,
      takePicture,
      startRecording,
      stopRecording,
    }),
    [cameraRef],
  );

  return <CvCameraView {...props} ref={cameraRef} />;
});

class CvInvokeGroup extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    groupid: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
  }
  renderChildren() {
    const { children, groupid, cvinvoke } = this.props;

    let ins = [];
    let functions = [];
    let paramsArr = [];
    let outs = [];
    let callbacks = [];
    let groupids = [];

    if (cvinvoke && cvinvoke.ins) {
      ins = cvinvoke.ins;
    }
    if (cvinvoke && cvinvoke.functions) {
      functions = cvinvoke.functions;
    }
    if (cvinvoke && cvinvoke.paramsArr) {
      paramsArr = cvinvoke.paramsArr;
    }
    if (cvinvoke && cvinvoke.outs) {
      outs = cvinvoke.outs;
    }
    if (cvinvoke && cvinvoke.callbacks) {
      callbacks = cvinvoke.callbacks;
    }
    if (cvinvoke && cvinvoke.groupids) {
      groupids = cvinvoke.groupids;
    }

    const offspring = React.Children.map(children, (child, i) => {
      if (child.type.displayName === 'CvInvoke') {
        const { inobj, func, params, outobj, callback } = child.props;
        ins.push(inobj); // can be nil
        functions.push(func);
        paramsArr.push(params);
        outs.push(outobj); // can be nil
        callbacks.push(callback); // can be nil
        groupids.push(groupid);
      } else {
        return React.cloneElement(child, {
          // pass info down to the next CvInvokeGroup or to the CvCamera
          ...child.props,
          cvinvoke: {
            ins: ins,
            functions: functions,
            paramsArr: paramsArr,
            outs: outs,
            callbacks: callbacks,
            groupids: groupids,
          },
        });
      }
    });
    return offspring;
  }
  render() {
    return <React.Fragment>{this.renderChildren()}</React.Fragment>;
  }
}

class CvInvoke extends Component {
  static propTypes = {
    inobj: PropTypes.string,
    func: PropTypes.string.isRequired,
    params: PropTypes.any,
    outobj: PropTypes.string,
    callback: PropTypes.string,
  };
  constructor(props) {
    super(props);
  }
  renderChildren() {
    const { cvinvoke, inobj, func, params, outobj, callback, children } =
      this.props;

    if (children) {
      let newins = [];
      let newfunctions = [];
      let newparamsarr = [];
      let newouts = [];
      let newcallbacks = [];

      if (cvinvoke && cvinvoke.ins) {
        newins = cvinvoke.ins;
      }
      if (cvinvoke && cvinvoke.functions) {
        newfunctions = cvinvoke.functions;
      }
      if (cvinvoke && cvinvoke.paramsArr) {
        newparamsarr = cvinvoke.paramsArr;
      }
      if (cvinvoke && cvinvoke.outs) {
        newouts = cvinvoke.outs;
      }
      if (cvinvoke && cvinvoke.callbacks) {
        newcallbacks = cvinvoke.callbacks;
      }
      newins.push(inobj);
      newfunctions.push(func);
      newparamsarr.push(params);
      newouts.push(outobj);
      newcallbacks.push(callback);

      const newKidsOnTheBlock = React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          // pass info down to the CvCamera
          ...child.props,
          cvinvoke: {
            ins: newins,
            functions: newfunctions,
            paramsArr: newparamsarr,
            outs: newouts,
            callbacks: newcallbacks,
          },
        }),
      );
      return newKidsOnTheBlock;
    } else {
      return (
        <CvInvoke
          inobj={inobj}
          func={func}
          params={params}
          outobj={outobj}
          callback={callback}
        />
      );
    }
  }
  render() {
    return <React.Fragment>{this.renderChildren()}</React.Fragment>;
  }
}

const RNCv = RNOpencv3;

export {
  RNCv,
  CvImage,
  CvCamera,
  CvInvoke,
  CvInvokeGroup,
  ColorConv,
  CvType,
  Imgproc,
  Core,
  Mat,
  MatOfInt,
  MatOfFloat,
  CvScalar,
  CvPoint,
  CvSize,
  CvRect,
};
