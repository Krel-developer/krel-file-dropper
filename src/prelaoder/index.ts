export class KrelPreloader {
  private $container: HTMLDivElement = document.createElement('div')
  private $preloader: HTMLDivElement = document.createElement('div')
  private preloaderAnimationId: number = 0

  constructor() {
    this.init()
  }

  private init(): void {
    this.initContainer()
    this.initPreloader()
  }
  public start(): void {
    document.body.append(this.$container)
    this.startPrelaoderAnimation()
  }
  public stop(): void {
    document.body.append(this.$container)
    // останавливаем анимацию по id анимации
    cancelAnimationFrame(this.preloaderAnimationId)
    this.setStyle(this.$preloader, {
      transformOrigin: '',
      transform: ``,
    })
    this.$container.remove()
  }

  private setStyle(node: HTMLElement, styles: Record<string, string>): void {
    // не очень красивое решение, но пока что по другом у никак
    Object.keys(styles).forEach((key: string) => {
      node.style[key as any] = styles[key]
    })
  }

  private initContainer(): void {
    this.setStyle(this.$container, {
      top: '0',
      bottom: '0',
      right: '0',
      screenLeft: '0',
      zIndex: '100000',
      position: 'absolute',
      height: '100%',
      width: '100%',
      maxWidth: '100vw',
      maxHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })

    const background: HTMLElement = document.createElement('div')

    this.setStyle(background, {
      background: '#fff',
      opacity: '0.5',
      height: '100%',
      width: '100%',
      position: 'absolute',
      left: '0',
      right: '0',
    })

    this.$container.append(background)
    this.$container.append(this.$preloader)
  }

  private initPreloader(): void {
    this.setStyle(this.$preloader, {
      // width: '100px',
      // height: '100px',
      position: 'relative',
      zIndex: '12',
    })
    this.$preloader.insertAdjacentHTML(
      'afterbegin',
      this.returnDefaultPreloaderTempalte()
    )
  }

  private startPrelaoderAnimation() {
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      // если анимация отключена, прерываем
      const elapsed = currentTime - startTime
      const progress = (elapsed % 2000) / 2000 // 2 сек на полный оборот
      const rotation = progress * 360

      this.setStyle(this.$preloader, {
        transformOrigin: '50% 50%',
        transform: `rotate(${rotation}deg)`,
      })

      this.preloaderAnimationId = requestAnimationFrame(animate)
    }

    this.preloaderAnimationId = requestAnimationFrame(animate)
  }

  private returnDefaultPreloaderTempalte(
    color: string = '#2c64c0',
    width: number = 75,
    height: number = 75
  ): string {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;" width="${width}" height="${height}" viewBox="0 0 16 16"><path fill="${color}" d="M15.2 6l-1.1-0.2c-0.1-0.2-0.1-0.4-0.2-0.6l0.6-0.9 0.5-0.7-2.6-2.6-0.7 0.5-0.9 0.6c-0.2-0.1-0.4-0.1-0.6-0.2l-0.2-1.1-0.2-0.8h-3.6l-0.2 0.8-0.2 1.1c-0.2 0.1-0.4 0.1-0.6 0.2l-0.9-0.6-0.7-0.4-2.5 2.5 0.5 0.7 0.6 0.9c-0.2 0.2-0.2 0.4-0.3 0.6l-1.1 0.2-0.8 0.2v3.6l0.8 0.2 1.1 0.2c0.1 0.2 0.1 0.4 0.2 0.6l-0.6 0.9-0.5 0.7 2.6 2.6 0.7-0.5 0.9-0.6c0.2 0.1 0.4 0.1 0.6 0.2l0.2 1.1 0.2 0.8h3.6l0.2-0.8 0.2-1.1c0.2-0.1 0.4-0.1 0.6-0.2l0.9 0.6 0.7 0.5 2.6-2.6-0.5-0.7-0.6-0.9c0.1-0.2 0.2-0.4 0.2-0.6l1.1-0.2 0.8-0.2v-3.6l-0.8-0.2zM15 9l-1.7 0.3c-0.1 0.5-0.3 1-0.6 1.5l0.9 1.4-1.4 1.4-1.4-0.9c-0.5 0.3-1 0.5-1.5 0.6l-0.3 1.7h-2l-0.3-1.7c-0.5-0.1-1-0.3-1.5-0.6l-1.4 0.9-1.4-1.4 0.9-1.4c-0.3-0.5-0.5-1-0.6-1.5l-1.7-0.3v-2l1.7-0.3c0.1-0.5 0.3-1 0.6-1.5l-1-1.4 1.4-1.4 1.4 0.9c0.5-0.3 1-0.5 1.5-0.6l0.4-1.7h2l0.3 1.7c0.5 0.1 1 0.3 1.5 0.6l1.4-0.9 1.4 1.4-0.9 1.4c0.3 0.5 0.5 1 0.6 1.5l1.7 0.3v2z"></path><path fill="${color}" d="M8 4.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5zM8 10.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z"></path></svg>`
  }
}
