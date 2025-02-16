import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Actions from '../Actions';
import { useNavigate } from "react-router-dom";

import { useGetProductsQuery,useDeleteProductMutation } from "../../../features/product/productApi";
 
export const AllProducts = () => {
    
    const navigate = useNavigate();

    const { data, isLoading, isSuccess, isError } = useGetProductsQuery() || {};
     
    const products = data?.products || [];   

    const prodsArray = products
        .filter(product => Object.keys(product).length > 0) 
        .map((product) => ({
            id: product._id || "", 
            name: product.name || "Unnamed Product",  
            category: product.category || "Unknown",
            stock: product.stock ?? 0,  
            price: product.price ?? 0,  
            cprice: product.cuttedPrice ?? 0,  
            image: product?.images?.[0]?.url || "/default-image.jpg",  
            rating: product.ratings?? 'null',
        }));

 
    const [deleteProductAdmin, { isLoading: isDeleting, isSuccess: isDeleted, isError: deleteError }] = useDeleteProductMutation();

    useEffect(() => {  
        if (isDeleted) {
            navigate("/admin/all-products");  
        }
    }, [isDeleted, navigate]);
        
    const deleteProductHandler = (id) => {
        deleteProductAdmin(id);
    }


    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full">
                        <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    {params.row.name}
                </div>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            headerAlign: "left",
            align: "left",
            minWidth: 70,
            flex: 0.1,
            renderCell: (params) => (
                params.row.stock < 10 ? (
                    <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">
                        {params.row.stock}
                    </span>
                ) : (
                    <span>{params.row.stock}</span>
                )
            ),
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => <span>₹{params.row.price.toLocaleString()}</span>,
        },
        {
            field: "cprice",
            headerName: "Cutted Price",
            type: "number",
            minWidth: 100,
            headerAlign: "left",
            align: "left",
            flex: 0.2,
            renderCell: (params) => <span>₹{params.row.cprice.toLocaleString()}</span>,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions editRoute={"product"} deleteHandler={deleteProductHandler} id={params.row.id} />
                );
            },
        },
    ];

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between px-4 py-2">
                <h1 className="text-xl font-medium">All Products</h1>
                <Link to="/admin/add-product" className="bg-primary-blue text-white px-4 py-2 rounded-sm shadow-lg">
                    Add Product
                </Link>
            </div>
            <hr />
            <div className="w-full h-full">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : isError ? (
                    <p>Error fetching products</p>
                ) : (
                    <DataGrid
                        rows={prodsArray}
                        columns={columns}
                        pageSize={10}
                        disableSelectIconOnClick
                        sx={{ boxShadow: 0, border: 0 }}
                    />
                )}
            </div>
        </div>
    );
};
