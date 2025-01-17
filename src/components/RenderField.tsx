import { tableHeader, tableData } from '../types/types';

export const RenderField = (props: {header: tableHeader, data: tableData}) => {
    switch (props.header.field) {
        case "Address":
            return <span>{props.data.Address}</span>

        case "City":
            return <span>{props.data.City}</span>

        case "State":
            return <span>{props.data.State}</span>

        case "ZipCode":
            return <span>{props.data.ZipCode}</span>

        case "County":
            return <span>{props.data.County}</span>

        case "PropertyType":
            return <span>{props.data.PropertyType}</span>

        case "Sqft":
            return <span>{props.data.Sqft}</span>
    }
}

export default RenderField;
