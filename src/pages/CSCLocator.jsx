import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cscCenters } from '../data/cscCenters';
import { indianStates } from '../data/states';
import { useLanguage } from '../context/LanguageContext';

// Fix Leaflet default marker icons (they break with bundlers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons
const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const activeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to recenter map when filters change
function MapController({ centers, activeCenter }) {
    const map = useMap();

    useEffect(() => {
        if (activeCenter) {
            map.flyTo([activeCenter.lat, activeCenter.lng], 15, { duration: 0.8 });
        } else if (centers.length > 0) {
            const bounds = L.latLngBounds(centers.map(c => [c.lat, c.lng]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
    }, [centers, activeCenter, map]);

    return null;
}

export default function CSCLocator() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [activeCenter, setActiveCenter] = useState(null);
    const cardRefs = useRef({});
    const { t } = useLanguage();

    const filteredCenters = cscCenters.filter(center => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || center.name.toLowerCase().includes(q) || center.address.toLowerCase().includes(q);
        const matchesState = !selectedState || center.address.toLowerCase().includes(selectedState.toLowerCase());
        return matchesSearch && matchesState;
    });

    const handleDirections = (center) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`, '_blank', 'noopener');
    };

    const handleCardClick = (center) => {
        setActiveCenter(center);
    };

    const handleMarkerClick = (center) => {
        setActiveCenter(center);
        const el = cardRefs.current[center.id];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const defaultCenter = [28.58, 77.17];

    return (
        <div className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Agent Badge */}
                <div className="text-center mb-4">
                    <span className="agent-badge core">
                        <i className="fas fa-map-marked-alt" aria-hidden="true"></i>
                        Agent 4 — {t('cscLocator.agent')}
                    </span>
                </div>

                <div className="text-center mb-10">
                    <h1 className="section-title">{t('cscLocator.title').split(' ').length > 2
                        ? <>{t('cscLocator.title').split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t('cscLocator.title').split(' ').slice(-1)}</span></>
                        : <>Find a <span className="text-gradient">Help Center</span></>
                    }</h1>
                    <p className="section-subtitle">CSC centers help you apply for government schemes near you.</p>
                </div>

                {/* Search & Filter */}
                <div className="card mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="csc-search" className="form-label"><i className="fas fa-search text-primary-400 mr-1" aria-hidden="true"></i>Search</label>
                            <input type="text" id="csc-search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-field" placeholder="Search by name or area..." aria-label="Search for a CSC center" />
                        </div>
                        <div>
                            <label htmlFor="csc-state" className="form-label"><i className="fas fa-map-marker-alt text-primary-400 mr-1" aria-hidden="true"></i>State</label>
                            <select id="csc-state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="form-field" aria-label="Filter by state">
                                <option value="">All States</option>
                                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Interactive Map */}
                    <div className="lg:col-span-2">
                        <div className="card p-0 overflow-hidden h-80 lg:h-full min-h-[400px] lg:sticky lg:top-24" style={{ zIndex: 1 }}>
                            <MapContainer
                                center={defaultCenter}
                                zoom={11}
                                style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                                scrollWheelZoom={true}
                                attributionControl={true}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {filteredCenters.map(center => (
                                    <Marker
                                        key={center.id}
                                        position={[center.lat, center.lng]}
                                        icon={activeCenter?.id === center.id ? activeIcon : defaultIcon}
                                        eventHandlers={{
                                            click: () => handleMarkerClick(center),
                                        }}
                                    >
                                        <Popup>
                                            <div className="min-w-[180px]">
                                                <p className="font-bold text-sm mb-1">{center.name}</p>
                                                <p className="text-xs text-gray-600 mb-1">{center.address}</p>
                                                <p className="text-xs text-primary-600 font-medium">{center.distance} away</p>
                                                <button
                                                    onClick={() => handleDirections(center)}
                                                    className="mt-2 text-xs bg-primary-500 text-white px-3 py-1 rounded-full hover:bg-primary-600 transition-colors"
                                                >
                                                    <i className="fas fa-directions mr-1" aria-hidden="true"></i>Get Directions
                                                </button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                                <MapController centers={filteredCenters} activeCenter={activeCenter} />
                            </MapContainer>
                        </div>
                    </div>

                    {/* Center Cards */}
                    <div className="lg:col-span-3 space-y-4">
                        <h2 className="font-heading font-bold text-lg flex items-center gap-2">
                            <i className="fas fa-list text-primary-500" aria-hidden="true"></i>{filteredCenters.length} Centers Found
                        </h2>
                        {filteredCenters.length === 0 ? (
                            <div className="card text-center py-12"><i className="fas fa-search text-4xl text-gray-300 mb-4" aria-hidden="true"></i><p className="text-gray-500">No centers found. Try adjusting your search.</p></div>
                        ) : filteredCenters.map(center => (
                            <article
                                key={center.id}
                                ref={el => cardRefs.current[center.id] = el}
                                className={`card border-2 cursor-pointer transition-all duration-200 ${activeCenter?.id === center.id
                                    ? 'border-primary-400 shadow-lg ring-2 ring-primary-100 bg-primary-50/30'
                                    : 'border-gray-100 hover:border-primary-200'
                                    }`}
                                aria-label={`CSC: ${center.name}`}
                                onClick={() => handleCardClick(center)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(center); } }}
                            >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <h3 className="font-heading font-bold text-gray-900">{center.name}</h3>
                                        <p className="text-sm text-primary-500 font-medium"><i className="fas fa-route mr-1" aria-hidden="true"></i>{center.distance} away</p>
                                    </div>
                                    <span className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full flex-shrink-0"><i className="fas fa-circle text-secondary-400 text-xs mr-1" aria-hidden="true"></i>Open</span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <p className="flex items-start gap-2"><i className="fas fa-map-pin text-gray-400 mt-1 w-4" aria-hidden="true"></i>{center.address}</p>
                                    <p className="flex items-center gap-2"><i className="fas fa-phone text-gray-400 w-4" aria-hidden="true"></i><a href={`tel:${center.phone}`} className="text-primary-500 hover:underline" onClick={e => e.stopPropagation()}>{center.phone}</a></p>
                                    <p className="flex items-center gap-2"><i className="fas fa-clock text-gray-400 w-4" aria-hidden="true"></i>{center.hours}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 mb-2">SERVICES:</p>
                                    <div className="flex flex-wrap gap-1.5">{center.services.map((s, i) => <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">{s}</span>)}</div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleDirections(center); }} className="btn-outline text-sm py-2 w-full sm:w-auto"><i className="fas fa-directions" aria-hidden="true"></i>Get Directions</button>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
