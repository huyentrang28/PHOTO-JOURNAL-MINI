import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource, type Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Preferences } from '@capacitor/preferences';

interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  title?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    loadSaved();
  }, []);

  async function takePhoto(title: string) {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
    });

    const fileName = `${new Date().getTime()}.jpeg`;
    const savedFile = await savePicture(cameraPhoto, fileName);

    const newPhotos = [{ filepath: fileName, webviewPath: savedFile, title }, ...photos];
    setPhotos(newPhotos);
    await Preferences.set({ key: 'photos', value: JSON.stringify(newPhotos) });
  }

  async function loadSaved() {
    const { value } = await Preferences.get({ key: 'photos' });
    const loadedPhotos = value ? JSON.parse(value) : [];
    setPhotos(loadedPhotos);
  }

  async function savePicture(photo: Photo, fileName: string) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = await convertBlobToBase64(blob) as string;

    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return photo.webPath;
  }

  async function deletePhoto(index: number) {
    const photoToDelete = photos[index];
    if (!photoToDelete) return;

    // Xóa file từ filesystem
    try {
      await Filesystem.deleteFile({
        path: photoToDelete.filepath,
        directory: Directory.Data,
      });
    } catch (error) {
      console.error('Lỗi khi xóa file:', error);
    }

    // Cập nhật state và preferences
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    await Preferences.set({ key: 'photos', value: JSON.stringify(updatedPhotos) });
  }

  async function editPhotoTitle(index: number, newTitle: string) {
    if (index < 0 || index >= photos.length) return;

    const updatedPhotos = photos.map((photo, i) => 
      i === index ? { ...photo, title: newTitle } : photo
    );
    
    setPhotos(updatedPhotos);
    await Preferences.set({ key: 'photos', value: JSON.stringify(updatedPhotos) });
  }

  async function sharePhoto(index: number) {
    const photo = photos[index];
    if (!photo || !photo.webviewPath) return;

    try {
      await Share.share({
        title: photo.title || 'Ảnh từ Photo Journal',
        text: `Chia sẻ ảnh: ${photo.title || 'Không có tiêu đề'}`,
        url: photo.webviewPath,
      });
    } catch (error) {
      console.error('Lỗi khi chia sẻ ảnh:', error);
    }
  }

  const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

  return { 
    photos, 
    takePhoto, 
    deletePhoto, 
    editPhotoTitle, 
    sharePhoto 
  };
}