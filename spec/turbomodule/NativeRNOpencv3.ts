import { TurboModule, TurboModuleRegistry } from 'react-native';

type Mat = {
  matIndex: number;
  rows: number;
  cols: number;
  CvType?: number;
};

type CvScalar = {
  value: number;
};

type CvPoint = {
  x: number;
  y: number;
};

type CvInvokeMap = {
  ins: string[];
  functions: string[];
  paramsArr: string[];
  outs: string[];
  callbacks: string[];
  groupids: string[];
};

export interface Spec extends TurboModule {
  // 图形绘制
  drawLine(
    inMat: Mat,
    pt1: CvPoint,
    pt2: CvPoint,
    scalarVal: CvScalar,
    thickness: number
  ): void;

  // 转换颜色
  cvtColor(
    sourceMat: Mat,
    destMat: Mat,
    convColorCode: number
  ): void;

  // 图片路径转 Mat
  imageToMat(inPath: string): Promise<string>;

  // Mat 转图片
  matToImage(srcMat: Mat, outPath: string): Promise<string>;

  // 执行多个 OpenCV 方法
  invokeMethods(cvInvokeMap: CvInvokeMap): void;

  // 方法调用带回调
  invokeMethodWithCallback(
    ins: string,
    func: string,
    params: string,
    out: string,
    callback: string
  ): void;

  // 执行 OpenCV 方法
  invokeMethod(func: string, params: string): void;

  // 执行带输入输出的 OpenCV 方法
  invokeInOutMethod(ins: string, func: string, params: string, out: string): void;

  // 通过标量创建 Mat
  MatWithScalar(
    rows: number,
    cols: number,
    cvtype: number,
    scalarMap: CvScalar
  ): Promise<Mat>;

  // 通过参数创建 Mat
  MatWithParams(
    rows: number,
    cols: number,
    cvtype: number
  ): Promise<Mat>;

  // 创建空 Mat
  Mat(): Promise<Mat>;

  // 获取 Mat 数据
  getMatData(mat: Mat, rownum: number, colnum: number): Promise<string>;

  // 设置 Mat 数据
  setTo(mat: Mat, cvscalar: CvScalar): void;

  // 设置 Mat 某位置的数据
  put(mat: Mat, rownum: number, colnum: number, data: string[]): void;

  // 转置 Mat
  transpose(mat: Mat): void;

  // 删除 Mat
  deleteMat(mat: Mat): void;

  // 删除所有 Mat
  deleteMats(): void;

  // 创建 Int 型 Mat
  MatOfInt(lomatint: number, himatint: number): Promise<Mat>;

  // 创建 Float 型 Mat
  MatOfFloat(lomatfloat: number, himatfloat: number): Promise<Mat>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNOpencv3');
