import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../styles/Property Owner/ForSaleViewListing.css';

interface SaleListingData {
    id: string;
    title: string;
    price: string;
    location: string;
    image: string;
    description: string;
    type: 'Sale';
    bedrooms: number;
    bathrooms: number;
    area: string;
    datePosted: string;
}

const MOCK_SALE_LISTINGS: Record<string, SaleListingData> = {
    'sale-1': {
        id: 'sale-1',
        title: 'Modern Apartment in F-10',
        price: 'PKR 4.5 Crore',
        location: 'F-10 Markaz, Islamabad',
        image: '/assets/images/premium_photo-1684175656320-5c3f701c082c (appartemnt).avif',
        description: 'Experience luxury living in this stunning modern apartment located in the heart of F-10 Markaz. Featuring state-of-the-art amenities, spacious rooms, and a breathtaking view of the Margalla Hills. Perfect for families looking for a secure and upscale lifestyle.',
        type: 'Sale',
        bedrooms: 3,
        bathrooms: 3,
        area: '2500 Sq. Ft.',
        datePosted: 'Oct 24, 2023'
    },
    'sale-2': {
        id: 'sale-2',
        title: 'Luxury Villa in DHA',
        price: 'PKR 12 Crore',
        location: 'DHA Phase 2, Islamabad',
        image: '/assets/images/photo-1515263487990-61b07816b324 (flat).avif',
        description: 'A masterpiece of architecture, this luxury villa in DHA offers unparalleled elegance. With a swimming pool, home theater, and lush green lawn, this property is designed for those who appreciate the finer things in life.',
        type: 'Sale',
        bedrooms: 5,
        bathrooms: 6,
        area: '1 Kanal',
        datePosted: 'Nov 12, 2023'
    }
};

export const ForSaleViewListing = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [listing, setListing] = useState<SaleListingData | null>(null);

    useEffect(() => {
        if (id && MOCK_SALE_LISTINGS[id]) {
            setListing(MOCK_SALE_LISTINGS[id]);
        } else {
            setListing(MOCK_SALE_LISTINGS['sale-1']); // Fallback
        }
    }, [id]);

    if (!listing) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="for-sale-content">
                <div className="back-button-container">
                    <button onClick={() => navigate(-1)} className="btn-standard d-flex align-items-center gap-2">
                        <ArrowLeft size={18} />
                        Back
                    </button>
                </div>

                <div className="listing-detail-card">
                    <div className="listing-image-container">
                        <img src={listing.image} alt={listing.title} className="listing-detail-img" />
                        <span className="sale-badge">For Sale</span>
                    </div>

                    <div className="listing-info-body">
                        <div className="listing-header">
                            <div className="row">
                                <div className="col-md-8">
                                    <h1 className="detail-title">{listing.title}</h1>
                                    <div className="detail-location">
                                        <MapPin size={20} />
                                        {listing.location}
                                    </div>
                                </div>
                                <div className="col-md-4 price-container">
                                    <span className="price-label">Asking Price</span>
                                    <div className="detail-price">{listing.price}</div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-features mb-5">
                            <div className="feature-item">
                                <Bed className="mb-2" size={28} />
                                <div className="fw-bold">{listing.bedrooms}</div>
                                <div className="small text-muted">Bedrooms</div>
                            </div>
                            <div className="feature-item">
                                <Bath className="mb-2" size={28} />
                                <div className="fw-bold">{listing.bathrooms}</div>
                                <div className="small text-muted">Bathrooms</div>
                            </div>
                            <div className="feature-item">
                                <Square className="mb-2" size={28} />
                                <div className="fw-bold">{listing.area}</div>
                                <div className="small text-muted">Area</div>
                            </div>
                            <div className="feature-item">
                                <Calendar className="mb-2" size={28} />
                                <div className="fw-bold">{listing.datePosted}</div>
                                <div className="small text-muted">Date Posted</div>
                            </div>
                        </div>

                        <div className="detail-description">
                            <h3>Description</h3>
                            <p>{listing.description}</p>
                        </div>

                        <div className="mt-5 pt-4 border-top">
                            <button className="btn-prominent w-100 py-3 fs-5 shadow-sm">Contact Agent / Owner</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForSaleViewListing;
