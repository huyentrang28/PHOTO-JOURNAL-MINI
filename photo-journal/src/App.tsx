import { useState } from 'react';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import './App.css';

export default function App() {
  const { photos, takePhoto, deletePhoto, editPhotoTitle, sharePhoto } = usePhotoGallery();
  const [title, setTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  return (
    <div className="app">
      <h1>Photo Journal</h1>

      <div className="input-row">
        <input
          placeholder="Nhập tiêu đề ảnh"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => {
            if (title.trim()) {
              takePhoto(title);
              setTitle('');
            } else {
              alert('Vui lòng nhập tiêu đề trước khi chụp');
            }
          }}
        >
          Chụp ảnh
        </button>
      </div>

      <div className="gallery">
        {photos.map((p, i) => (
          <div key={i} className="photo-card">
            <img src={p.webviewPath} alt={p.title} />
            
            {editingIndex === i ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Nhập tiêu đề mới"
                />
                <div className="edit-buttons">
                  <button 
                    onClick={() => {
                      if (editTitle.trim()) {
                        editPhotoTitle(i, editTitle);
                        setEditingIndex(null);
                        setEditTitle('');
                      }
                    }}
                    className="save-btn"
                  >
                    Lưu
                  </button>
                  <button 
                    onClick={() => {
                      setEditingIndex(null);
                      setEditTitle('');
                    }}
                    className="cancel-btn"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="photo-info">
                <p>{p.title}</p>
                <div className="photo-actions">
                  <button 
                    onClick={() => {
                      setEditingIndex(i);
                      setEditTitle(p.title || '');
                    }}
                    className="edit-btn"
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => sharePhoto(i)}
                    className="share-btn"
                  >
                    Chia sẻ
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa ảnh này?')) {
                        deletePhoto(i);
                      }
                    }}
                    className="delete-btn"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
