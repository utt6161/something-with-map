import axios, { AxiosResponse } from "axios";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Topology } from "topojson-specification";
import { Feature, Geometry, GeoJsonProperties } from 'geojson';
import { FeatureCollection } from 'geojson';
import { feature }  from 'topojson-client';
import { v4 as uuidv4 } from "uuid"
import { geoEqualEarth, geoEquirectangular, geoMercator, geoMercatorRaw, geoOrthographic, geoPath, GeoProjection, geoStereographic } from "d3-geo";
import * as d3 from "d3"

const loadBorders = async () => {
    return ( await axios.get<FeatureCollection>("/public/borders.json") )
}

export default class Map extends React.PureComponent<IMapProps, IMapState> {
    private _asyncRequestStatus: boolean

    constructor(props: IMapProps) {
        super(props);
        this._asyncRequestStatus = false
        this.state = {
            borders: [],
            projection : geoMercator(),
            bboxes: new Array<Array<number>>()
        }
    }

    // If you need 'shouldComponentUpdate' -> Refactor to React.Component
    // Read more about component lifecycle in the official docs:
    // https://reactjs.org/docs/react-component.html

    /*
    public shouldComponentUpdate(nextProps: IMyPageProps, nextState: IMyPageState) {
        // invoked before rendering when new props or state are being received.
        return true // or prevent rendering: false
    } */

    componentDidMount(){
        this._asyncRequestStatus = true
        
        loadBorders().then(
            externalData => {
                this._asyncRequestStatus = false;
                let bordersData = externalData.data
                console.log(bordersData.features)
                this.setState({borders: bordersData.features});
            }
        );
        
    }

    static getDerivedStateFromProps: React.GetDerivedStateFromProps<IMapProps, IMapState> = (props:IMapProps, state: IMapState) => {
    // invoked right before calling the render method, both on the initial mount and on subsequent updates
    // return an object to update the state, or null to update nothing.
        return null
    }

    public getSnapshotBeforeUpdate(prevProps: IMapProps, prevState: IMapState) {
        // Runs before React applies the result of render to the document, and returns an object to be given to componentDidUpdate. 
        //Useful for saving things such as scroll position before render causes changes to it.
        // Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated lifecycle events from running.
        return null
    }

    componentDidUpdate(prevProps: IMapProps, prevState: IMapState, snapshot: IMapSnapshot) {
        // Called immediately after updating occurs. Not called for the initial render.
        // The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

    }

    render() {
        return (
            <div className="Map">
                <svg width={this.props.scale * 5} height={this.props.scale * 5} viewBox="0 0 1300 750">
				<g>
				{(this.state.borders as []).map((d: Feature, i) => (
					<>
                        <path
                            key={`path-${uuidv4()}`}
                            d={geoPath().projection(this.state.projection)(d) as string}
                            fill={`rgb(30,50,50)`}
                            stroke="aliceblue"
                        />
                        <text
                            key = {`text-${uuidv4()}`}
                            x = {d3.geoPath(this.state.projection).centroid(d.geometry)[0]}
                            y = {d3.geoPath(this.state.projection).centroid(d.geometry)[1]}
                        >
                            {d.properties ? d.properties.ADMIN : ""}
                        </text>
                    </>
				))}
				</g>
			</svg>
    	</div>)
    }
}

interface IMapProps {
    scale: number
	cx: number
	cy: number
}

interface IMapState {
    borders: Feature<Geometry, GeoJsonProperties>[]
    projection: GeoProjection,
    bboxes: number[][]
}

interface IMapSnapshot {
    // TODO
}

function uuid() {
    throw new Error("Function not implemented.");
}
