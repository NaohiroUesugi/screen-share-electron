import { desktopCapturer, DesktopCapturerSource, ipcRenderer } from 'electron';

export type ScreenType = {
  id: string;
  title: string;
  url: string;
};

export class Screen {
  static getSources(types: string[]): Promise<DesktopCapturerSource[]> {
    return desktopCapturer.getSources({ types });
  }

  static formatScreenData(source: DesktopCapturerSource) {
    return {
      id: source.id,
      title: source.name,
      url: source.thumbnail.toDataURL(),
    };
  }

  static async setScreen(screenId: string): Promise<MediaStream> {
    const { width, height } = await ipcRenderer.invoke('get-windows-size');
    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: screenId,
          minWidth: width,
          maxWidth: width,
          minHeight: height,
          maxHeight: height,
        },
      },
    } as MediaStreamConstraints);
  }

  static drawingCanvas = (videoRef) => {
    const canvas: HTMLCanvasElement =
      document.querySelector('#video-canvas') || null;
    canvas.id = 'video-canvas';
    canvas.width = videoRef.current.srcObject
      .getVideoTracks()[0]
      .getSettings().width;
    canvas.height = videoRef.current.srcObject
      .getVideoTracks()[0]
      .getSettings().height;
    canvas.style.display = 'block';

    // edit-canvas
    const editCanvas: HTMLCanvasElement =
      document.querySelector('#edit-canvas') || null;
    editCanvas.style.display = 'block';
    editCanvas.style.height = `${canvas.clientHeight}px`;

    const _canvasUpdate = () => {
      const {
        width,
        height,
      } = videoRef.current.srcObject.getVideoTracks()[0].getSettings();
      canvas
        .getContext('2d')
        .drawImage(videoRef.current as CanvasImageSource, 0, 0, width, height);
      requestAnimationFrame(_canvasUpdate);
    };

    _canvasUpdate();
  };
}
