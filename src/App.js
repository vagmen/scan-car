import React, { Component } from 'react';
import PrismaZoom from 'react-prismazoom';
import { Icon } from 'antd';

import Image1 from './images/1.png';
import Image2 from './images/2.png';
import './App.css';

const imagesData = { '1': Image1, '2': Image2 };
let selectedImageId = '1';

class App extends Component {
    state = {
        selectedImageUrl: null,
        brightness: 1,
        loading: false,
    };
    componentDidMount() {
        this.setState({
            loading: true,
            selectedImageUrl: imagesData[selectedImageId],
        });
    }

    getImage = (id) => imagesData[id];

    toggleImage = () => {
        let id = '1';
        if (selectedImageId === '1') id = '2';
        this.setState({
            selectedImageUrl: imagesData[id],
            loading: true,
        });
        selectedImageId = id;
    };

    onLoadImg = () => this.setState({ loading: false });

    onDoubleClickOnCard = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const prismaZoom = this.refs.prismaZoom;
        const zoneRect = event.currentTarget.getBoundingClientRect();
        const layoutRect = event.currentTarget.parentNode.getBoundingClientRect();

        const zoom = prismaZoom.getZoom();

        if (zoom > 1) {
            prismaZoom.reset();
            return;
        }

        const [relX, relY] = [
            (zoneRect.left - layoutRect.left) / zoom,
            (zoneRect.top - layoutRect.top) / zoom,
        ];
        const [relWidth, relHeight] = [
            zoneRect.width / zoom,
            zoneRect.height / zoom,
        ];
        prismaZoom.zoomToZone(relX, relY, relWidth, relHeight);
    };

    render() {
        const { selectedImageUrl, brightness, loading } = this.state;

        return (
            <React.Fragment>
                <div className="control-panel">
                    <span
                        className="control-panel__button"
                        onClick={() => this.refs.prismaZoom.zoomIn(0.5)}
                    >
                        <Icon type="zoom-in" theme="outlined" />
                    </span>
                    <span
                        className="control-panel__button"
                        onClick={() => this.refs.prismaZoom.zoomOut(0.5)}
                    >
                        <Icon type="zoom-out" theme="outlined" />
                    </span>
                    <span
                        className="control-panel__button"
                        onClick={this.toggleImage}
                    >
                        <Icon type="arrow-left" theme="outlined" />
                    </span>
                    <span
                        className="control-panel__button"
                        onClick={this.toggleImage}
                    >
                        <Icon type="arrow-right" theme="outlined" />
                    </span>
                    <span
                        className="control-panel__button"
                        onClick={() =>
                            this.setState({
                                brightness: this.state.brightness + 0.1,
                            })
                        }
                    >
                        <Icon type="plus" theme="outlined" />
                    </span>
                    <span
                        className="control-panel__button"
                        onClick={() =>
                            this.setState({
                                brightness: this.state.brightness - 0.1,
                            })
                        }
                    >
                        <Icon type="minus" theme="outlined" />
                    </span>
                </div>
                <div className="scan-viewer">
                    {selectedImageUrl && (
                        <PrismaZoom
                            ref="prismaZoom"
                            topBoundary={120}
                            onDoubleClick={this.onDoubleClickOnCard}
                        >
                            <img
                                src={selectedImageUrl}
                                alt="qwe"
                                style={{ filter: `brightness(${brightness})` }}
                                onLoad={this.onLoadImg}
                            />
                        </PrismaZoom>
                    )}
                    {loading && (
                        <div className="loading">
                            <Icon
                                style={{
                                    color: '#fff',
                                    fontSize: '50px',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                }}
                                type="loading"
                                theme="outlined"
                            />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
