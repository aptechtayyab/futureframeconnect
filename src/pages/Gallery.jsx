import { useState, useEffect } from "react";
import GalleryData from "../data/gallery.json";
import "../css/gallery.css";
import useDocumentTitle from "../Hooks/useDocumentTitle";

function Gallery() {
  useDocumentTitle("Gallery - CampusConnect");
  const [images, setImages] = useState(GalleryData.gallery);
  const [lightboxImage, setLightboxImage] = useState(null); 

  // Filter by Year
  function handleYearFilter(year) {
    if (year === "all") {
      setImages(GalleryData.gallery);
    } else {
      setImages(GalleryData.gallery.filter((img) => img.year === year));
    }
  }

  // Filter by Category
  function handleCategoryFilter(category) {
    if (category === "all") {
      setImages(GalleryData.gallery);
    } else {
      setImages(GalleryData.gallery.filter((img) => img.category === category));
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-dark text-white text-center p-4 m-3">
        <div className="container">
          <h1>Event Gallery</h1>
          <p className="lead">Explore event memories by year and category</p>
        </div>
      </header>

      <div className="container">
        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <select
              className="form-select sort-select"
              onChange={(e) => handleYearFilter(e.target.value)}
            >
              <option value="all">Filter by Year</option>
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-select sort-select"
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              <option value="all">Filter by Category</option>
              <option value="academic">Academic</option>
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="row">
          {images.map((img) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={img.id}>
              <div
                className="gallery-card position-relative"
                onClick={() => setLightboxImage(img.image)} 
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="img-fluid gallery-img"
                />
                <div className="gallery-info">
                  <h5>{img.title}</h5>
                  <p>
                    {img.year} • {img.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-muted">No images found.</p>
        )}
      </div>

      {/*  Lightbox Overlay */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <span
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
          >
            ❌
          </span>
          <img src={lightboxImage} alt="Preview" className="lightbox-img" />
        </div>
      )}
    </>
  );
}

export default Gallery;

