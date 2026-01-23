import React from 'react';
import './CollectionGrid.css';

const CollectionGrid = () => {
    return (
        <section className="collection-grid-section container">
            <div className="collection-header">
                <h2 className="collection-title">EXPLORE COLLECTION</h2>
                <p className="collection-subtitle">Seven innovative categories designed for maximum performance and comfort</p>
            </div>

            <div className="bento-grid">
                {/* Large Left Image - Yoga/Lifestyle */}
                <div className="bento-item large-left">
                    <img src="/assets/yoga_lifestyle.png" alt="Yoga Lifestyle" />
                    <div className="bento-overlay">
                        <span className="bento-tag">Yoga & Studio</span>
                    </div>
                </div>

                {/* Top Right - Compression Sleeves */}
                <div className="bento-item top-right">
                    <img src="/assets/compression_detail.png" alt="Compression Sleeves" />
                    <div className="bento-overlay">
                        <span className="bento-category">COMPRESSION<br />SLEEVES</span>
                    </div>
                </div>

                {/* Mid Right - Thigh High Socks */}
                <div className="bento-item mid-right">
                    <img src="/assets/thigh_high_lifestyle.png" alt="Thigh High Socks" />
                    <div className="bento-overlay">
                        <span className="bento-category">THIGH HIGH<br />SOCKS</span>
                    </div>
                </div>

                {/* Bottom Wide - Fabric Texture */}
                <div className="bento-item bottom-wide">
                    <img src="/assets/fabric_texture.png" alt="Fabric Texture" />
                    <div className="bento-overlay">
                        <span className="bento-tag">Performance Fabric Tech</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionGrid;
