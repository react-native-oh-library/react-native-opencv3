import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "./generated/ts"

export class RNOpencvTurboModule extends TurboModule implements TM.RNOpencv3.Spec {
  private logger = this.ctx.logger.clone("RNOpencvTurboModule")
  drawLine(inMat: TM.RNOpencv3.Mat, pt1: TM.RNOpencv3.CvPoint, pt2: TM.RNOpencv3.CvPoint,
    scalarVal: TM.RNOpencv3.CvScalar, thickness: number): void {
    this.logger.info('drawLine is been invoked')
    return
  }

  cvtColor(sourceMat: TM.RNOpencv3.Mat, destMat: TM.RNOpencv3.Mat, convColorCode: number): void {
    this.logger.info('cvtColor is been invoked')
  }

  imageToMat(inPath: string): Promise<string> {
    this.logger.info('imageToMat is been invoked')
    return Promise.resolve('str')
  }

  matToImage(srcMat: TM.RNOpencv3.Mat, outPath: string): Promise<string> {
    this.logger.info('matToImage is been invoked')
    return Promise.resolve('str')
  }

  invokeMethods(cvInvokeMap: TM.RNOpencv3.CvInvokeMap): void {
    this.logger.info('invokeMethods is been invoked')
    return
  }

  invokeMethodWithCallback(ins: string, func: string, params: string, out: string, callback: string): void {
    this.logger.info('invokeMethodWithCallback is been invoked')
    return
  }

  invokeMethod(func: string, params: string): void {
    this.logger.info('invokeMethod is been invoked')
    return
  }

  invokeInOutMethod(ins: string, func: string, params: string, out: string): void {
    this.logger.info('invokeInOutMethod is been invoked')
    return
  }

  MatWithScalar(rows: number, cols: number, cvtype: number,
    scalarMap: TM.RNOpencv3.CvScalar): Promise<TM.RNOpencv3.Mat> {
    this.logger.info('MatWithScalar is been invoked')
    return Promise.resolve({matIndex: 1, rows: 1, cols: 1, CvType: 1})
  }

  MatWithParams(rows: number, cols: number, cvtype: number): Promise<TM.RNOpencv3.Mat> {
    this.logger.info('MatWithParams is been invoked')
    return Promise.resolve({matIndex: 1, rows: 1, cols: 1, CvType: 1})
  }

  Mat(): Promise<TM.RNOpencv3.Mat> {
    this.logger.info('Mat is been invoked')
    return Promise.resolve({matIndex: 1, rows: 1, cols: 1, CvType: 1})
  }

  getMatData(mat: TM.RNOpencv3.Mat, rownum: number, colnum: number): Promise<string> {
    this.logger.info('getMatData is been invoked')
    return Promise.resolve('str')
  }

  setTo(mat: TM.RNOpencv3.Mat, cvscalar: TM.RNOpencv3.CvScalar): void {
    this.logger.info('setTo is been invoked')
    return
  }

  put(mat: TM.RNOpencv3.Mat, rownum: number, colnum: number, data: string[]): void {
    this.logger.info('put is been invoked')
    return
  }

  transpose(mat: TM.RNOpencv3.Mat): void {
    this.logger.info('transpose is been invoked')
    return
  }

  deleteMat(mat: TM.RNOpencv3.Mat): void {
    this.logger.info('deleteMat is been invoked')
    return
  }

  deleteMats(): void {
    this.logger.info('deleteMats is been invoked')
    return
  }

  MatOfInt(lomatint: number, himatint: number): Promise<TM.RNOpencv3.Mat> {
    this.logger.info('MatOfInt is been invoked')
    return Promise.resolve({matIndex: 1, rows: 1, cols: 1, CvType: 1})
  }

  MatOfFloat(lomatfloat: number, himatfloat: number): Promise<TM.RNOpencv3.Mat> {
    this.logger.info('MatOfFloat is been invoked')
    return Promise.resolve({matIndex: 1, rows: 1, cols: 1, CvType: 1})
  }

}