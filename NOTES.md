# Notes WebGPU


## Initialisation de WebGPU

WebGPU est le successeur de l'API WebGL.

Il faut tester si le navigateur est compatible ou non avec WebGPU:

```js
  if (!navigator.gpu) {
    throw error('WebGPU is not supported on this browser')
  }
```

Une fois la vérification faite, on doit demander au gpu un ***GPUAdapter***.

```js
  const adapter = await navigator.gpu.requestAdapter()

  if (!adapter) {
    throw error('No appropriate WebGPU adapter found')
  }
```

***Note***: il est possible de fournir un argument à la methode ***requestAdapter()*** permettant de dire au gpu si on souhaite utiliser du materiel basse consommation ou haute performance (***"low-power"*** ou ***"high-performance"***).

Une fois que l'adaptateur a été récupéré, il nous reste qu'à demander un appareil GPU (GPUDevice). C'est par cet appareil que l'on va intéragir pour communiquer les instructions vers le GPU.

```js
  const device = await adapter.requestDevice()
```

### Configurer le <canvas> 

Ensuite, nous allons configurer le canvas en lui créant et configurant le contexte ***webgpu***.

```js
  const context = canvas.context('webgpu')
  const contextFormat = canvas.getPreferedCanvasFormat()
  context.configure({
    device: device,
    format: contextFormat
  })
```

### Effacer le <canvas> 

Le canvas a été configuré, on peut donc commencer à l'utiliser pour dessiner dessus. Pour cela, il est nécessaire de créer un encodeur, qui va permettre de stocker et transmettre les commandes.

```js
  const encoder = device.createEncoder()
```

Il est nécessaire de créer une passe de rendu, qui va permettre de générer le visuel dans notre canvas.

```js
  const pass = encode.beginRenderPass({
    colorAttachment: [{
      view: context.getCurrentTexture().createView(),
      loadOp: 'clear',
      storeOp: 'store'
    }]
  })

  pass.end()
```

Une fois la renderPass créée et terminée, on doit la 

```js
  // Finish the command buffer and immediately submit it.
  device.queue.submit([encoder.finish()]);
```


```js
  // Finish the command buffer and immediately submit it.
  const pass = encoder.beginRenderPass({
  colorAttachments: [{
    ...
    clearValue: [1, 0, 0, 1], // New line (rgba value)
    ...
  }],
});
```


