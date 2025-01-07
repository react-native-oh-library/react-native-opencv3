import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "./generated/ts"

export class CvCameraModule extends TurboModule implements TM.CvCameraModule.Spec {
  private logger = this.ctx.logger.clone("CvCameraViewModule")

  setOverlay(options: { overlayMat: number; }, viewHandle: number): void {
    this.logger.info('setOverlay is been invoked')
    return
  }

  takePicture(options: { filename: string; }, viewHandle: number): Promise<string> {
    this.logger.info('takePicture is been invoked')
    return Promise.resolve('str')
  }

  startRecording(options: { filename: string; }, viewHandle: number): void {
    this.logger.info('startRecording is been invoked')
    return
  }

  stopRecording(viewHandle: number): Promise<void> {
    this.logger.info('stopRecording is been invoked')
    return Promise.resolve()
  }
}