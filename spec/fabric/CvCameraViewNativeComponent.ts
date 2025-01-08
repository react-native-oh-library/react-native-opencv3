import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {
  DirectEventHandler,
  Double,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

export interface CvCameraViewNativeProps extends ViewProps {
  facing?: WithDefault<'front' | 'back', 'front'>;
  cvinvoke: string; // todo
  useStorage?: boolean;
  faceClassifier?: string;
  eyesClassifier?: string;
  noseClassifier?: string;
  mouthClassifier?: string;
  landmarksModel?: string;
  overlayInterval?: Int32;

  onFacesDetectedCv?: DirectEventHandler<{}>;
  onCameraFrame?: DirectEventHandler<{}>;
  onFrameSize?: DirectEventHandler<{}>;
}

export interface NativeCommands {
  setOverlay: (viewRef: React.ElementRef<HostComponent<CvCameraViewNativeProps>> ) => void;
  takePicture: (viewRef: React.ElementRef<HostComponent<CvCameraViewNativeProps>>) => void;
  startRecording: (viewRef: React.ElementRef<HostComponent<CvCameraViewNativeProps>>) => void;
  stopRecording: (viewRef: React.ElementRef<HostComponent<CvCameraViewNativeProps>>) => void;
}

export const Commands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['setOverlay', 'takePicture', 'startRecording', 'stopRecording'],
});

export default codegenNativeComponent<CvCameraViewNativeProps>(
  'CvCameraView',
) as HostComponent<CvCameraViewNativeProps>;
