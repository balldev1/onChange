"use client"
import { useState } from "react";
import axios from "axios";

interface ImageData {
    id: number;
    preview: string;
    file: File;
}

export const AddProductAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        status: 'Published',
        visibility: 'Public',
        publishOn: '',
        catalogVisibility: 'Shop and search results',
        description: '',
        regularPrice: 0,
        salePrice: 0,
        taxStatus: 'Taxable',
        taxClass: 'Standard',
        productLayout: 'Default',
        productStyle: 'Default',
        sku: '',
        stockManagement: true,
        quantity: 0,
        allowBackorders: 'Do not allow',
        lowStockThreshold: 0,
        stockStatus: '',
        soldIndividually: false,
        totalStockQuantity: 0,
        weight: 0,
        shippingClass: 'No shipping class',
        specifications: {},
        categories: []
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/product', formData);
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="text-base-300">
            <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={formData.weight}
                onChange={handleChange}
                className="bg-base-300"
            />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
            </select>
            {/* Add more input fields as needed */}
            <button type="submit">Submit</button>
        </form>
    );
}
