#pragma once

#include "RNOH/generated/BaseReactNativeOpencv3Package.h"

namespace rnoh {

class OpencvPackage : public BaseReactNativeOpencv3Package {
    using Super = BaseReactNativeOpencv3Package;

public:
    OpencvPackage(Package::Context ctx) : Super(ctx) {}
};
} // namespace rnoh