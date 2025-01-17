import { tableData } from '../types/types';

interface SearchParams {
    name: string;
    TIN: string;
}

export const useGetPropertyData = () => {
    const fetchProperties = async (params: SearchParams): Promise<tableData[]> => {
        // Simulating an API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - replace this with actual API call later
        return [
            {
                Address: "123 Main St",
                City: "Anytown",
                State: "CA",
                ZipCode: "12345",
                County: "Orange",
                PropertyType: "Residential",
                Sqft: "1500",
            },
            {
                Address: "456 Oak Ave",
                City: "Post Falls",
                State: "ID",
                ZipCode: "83854",
                County: "Kootenai",
                PropertyType: "Commercial",
                Sqft: "2500",
            },
            {
                Address: "789 Main St",
                City: "Spokane",
                State: "WA",
                ZipCode: "99201",
                County: "Spokane",
                PropertyType: "Residential",
                Sqft: "1500",
            },
            {
                Address: "456 Main St",
                City: "Libby",
                State: "MT",
                ZipCode: "59923",
                County: "Lincoln",
                PropertyType: "Residential",
                Sqft: "1500",
            },
        ];
    };

    return { fetchProperties };
};
