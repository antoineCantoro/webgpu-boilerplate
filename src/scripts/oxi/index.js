import Shaders from '../../shaders/default.wgsl'

export default class Oxi {
  constructor({
    canvas,
    context,
    device
  }) {
    this.canvas = canvas
    this.context = context
    this.device = device

    this.devicePixelRatio = window.devicePixelRatio || 1


    // 
    this.vertices = new Float32Array([
      0.0, 0.6, 0, 1, 1, 0, 0, 1, -0.5, -0.6, 0, 1, 0, 1, 0, 1, 0.5, -0.6, 0, 1, 0,
      0, 1, 1
    ])

    this.init()
  }

  init() {
    console.log('Oxi Instance is created')

    this.canvas.width = 800
    this.canvas.height = 600


    // this.shaderModule = device.createShaderModule({
    //   code: shaders
    // })


    this.context.configure({
      device: this.device,
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: 'premultiplied',
    })

    const vertexBuffer = this.device.createBuffer({
      size: this.vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })

    this.device.queue.writeBuffer(vertexBuffer, 0, this.vertices, 0, this.vertices.length);

    const vertexBuffers = [
      {
        attributes: [
          {
            shaderLocation: 0, // position
            offset: 0,
            format: "float32x4",
          },
          {
            shaderLocation: 1, // color
            offset: 16,
            format: "float32x4",
          },
        ],
        arrayStride: 32,
        stepMode: "vertex",
      },
    ]

    // const pipelineDescriptor = {
    //   vertex: {
    //     module: shaderModule,
    //     entryPoint: "vertex_main",
    //     buffers: vertexBuffers,
    //   },
    //   fragment: {
    //     module: shaderModule,
    //     entryPoint: "fragment_main",
    //     targets: [
    //       {
    //         format: navigator.gpu.getPreferredCanvasFormat(),
    //       },
    //     ],
    //   },
    //   primitive: {
    //     topology: "triangle-list",
    //   },
    //   layout: "auto",
    // };
  }

  render() {
    console.log('render')
  }
}