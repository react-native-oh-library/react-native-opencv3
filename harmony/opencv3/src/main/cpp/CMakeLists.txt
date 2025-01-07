
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)
set(rnoh_opencv_generated_dir "${CMAKE_CURRENT_SOURCE_DIR}/generated")

file(GLOB rnoh_opencv_SRC CONFIGURE_DEPENDS *.cpp)
file(GLOB_RECURSE rnoh_opencv_generated_SRC "${rnoh_opencv_generated_dir}/**/*.cpp")

add_library(rnoh_opencv SHARED ${rnoh_opencv_SRC} ${rnoh_opencv_generated_SRC})
target_include_directories(rnoh_opencv PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${rnoh_opencv_generated_dir}
    ${CMAKE_CURRENT_SOURCE_DIR}/generated/react/render/components/react_native_opencv3
)

target_link_libraries(rnoh_opencv PUBLIC rnoh)