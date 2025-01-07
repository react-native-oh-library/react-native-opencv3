import { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// 定义 CvCameraView 原生模块接口
export interface Spec extends TurboModule {
  // 设置叠加图像
  setOverlay(options: { overlayMat: number }, viewHandle: number): void;

  // 拍照
  takePicture(options: { filename: string }, viewHandle: number): Promise<string>;

  // 开始录像
  startRecording(options: { filename: string }, viewHandle: number): void;

  // 停止录像
  stopRecording(viewHandle: number): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CvCameraModule');


