import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';
import type {
  TurboModule,
  TurboModuleContext,
  DescriptorWrapperFactoryByDescriptorTypeCtx,
  DescriptorWrapperFactoryByDescriptorType
} from '@rnoh/react-native-openharmony/ts';
import { RNOpencvTurboModule } from './RNOpencvTurboModule';
import { CvCameraModule } from './CvCameraTurboModule';
import { TM, RNC } from "./generated/ts"

class RNOpencvTurboModuleFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === TM.RNOpencv3.NAME) {
      globalThis.uiAbilityContext = this.ctx.uiAbilityContext;
      return new RNOpencvTurboModule(this.ctx);
    }
    if (name === TM.CvCameraModule.NAME) {
      globalThis.uiAbilityContext = this.ctx.uiAbilityContext;
      return new CvCameraModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === TM.RNOpencv3.NAME || name === TM.CvCameraModule.NAME;
  }
}

export class RNOpencvPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new RNOpencvTurboModuleFactory(ctx);
  }

  createDescriptorWrapperFactoryByDescriptorType(
    ctx: DescriptorWrapperFactoryByDescriptorTypeCtx
  ): DescriptorWrapperFactoryByDescriptorType {

    return {
      [RNC.CvCameraView.NAME]: (ctx) =>
      new RNC.CvCameraView.DescriptorWrapper(ctx.descriptor),
    };
  }
}