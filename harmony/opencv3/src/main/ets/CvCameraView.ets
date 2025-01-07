import { RNComponentContext, RNViewBase } from '@rnoh/react-native-openharmony';
import { RNC } from "./generated/ts"

@Component
export struct CvCameraView {
  public static readonly NAME = RNC.CvCameraView.NAME
  public ctx!: RNComponentContext
  public tag: number = 0
  // 组件的状态包装器
  @State private descriptorWrapper: RNC.CvCameraView.DescriptorWrapper =
    {} as RNC.CvCameraView.DescriptorWrapper
  private eventEmitter: RNC.CvCameraView.EventEmitter | undefined = undefined
  // 存储需要在组件卸载时清理的回调函数
  private cleanUpCallbacks: (() => void)[] = []

  aboutToAppear() {
    // 创建EventEmitter实例，用于处理事件的订阅和触发
    this.eventEmitter = new RNC.CvCameraView.EventEmitter(this.ctx.rnInstance, this.tag)
    // 处理组件初始状态
    this.executeCommand()
    this.onDescriptorWrapperChange(this.ctx.descriptorRegistry.findDescriptorWrapperByTag<RNC.CvCameraView.DescriptorWrapper>(this.tag)!)
    // 订阅组件状态的变化，然后放入cleanUpCallbacks等待清理
    this.cleanUpCallbacks.push(this.ctx.descriptorRegistry.subscribeToDescriptorChanges(this.tag,
      (_descriptor, newDescriptorWrapper) => {
        // 更新组件状态
        this.onDescriptorWrapperChange(newDescriptorWrapper! as RNC.CvCameraView.DescriptorWrapper)
      }
    ))
  }

  executeCommand() {
    this.cleanUpCallbacks.push(this.ctx.componentCommandReceiver.registerCommandCallback(
      this.tag,
      (command: string, args: string[]) => this.registerCommandCallback(command, args)))
  }

  registerCommandCallback(commandName: string, args: string[]) {
    switch (commandName) {
      case 'setOverlay':
        console.log('setOverlay')
        break
      case 'takePicture':
        console.log('takePicture')
        break
      case 'startRecording':
        console.log('startRecording')
        break
      case 'stopRecording':
        console.log('stopRecording')
        break
      default:
        break
    }
  }

  // 更新组件状态
  private onDescriptorWrapperChange(descriptorWrapper: RNC.CvCameraView.DescriptorWrapper) {
    this.descriptorWrapper = descriptorWrapper
  }

  aboutToDisappear() {
    // 执行所有清理回调
    this.cleanUpCallbacks.forEach(cb => cb())
  }

  build() {
    RNViewBase({ ctx: this.ctx, tag: this.tag }) {
      Column() {
        Text(`facing is ${this.descriptorWrapper.props.facing}`).fontSize(16)
        Text(`cvinvoke is ${JSON.stringify(this.descriptorWrapper.props.cvinvoke)}`).fontSize(16)
        Text(`useStorage is ${this.descriptorWrapper.props.useStorage}`).fontSize(16)
        Text(`faceClassifier is ${this.descriptorWrapper.props.faceClassifier}`).fontSize(16)
        Text(`eyesClassifier is ${this.descriptorWrapper.props.eyesClassifier}`).fontSize(16)
        Text(`noseClassifier is ${this.descriptorWrapper.props.noseClassifier}`).fontSize(16)
        Text(`mouthClassifier is ${this.descriptorWrapper.props.mouthClassifier}`).fontSize(16)
        Text(`landmarksModel is ${this.descriptorWrapper.props.landmarksModel}`).fontSize(16)
        Text(`overlayInterval is ${this.descriptorWrapper.props.overlayInterval}`).fontSize(16)
      }.margin({ top: 30, left: 0 }).width('100%').alignItems(HorizontalAlign.Start)
    }
  }
}
