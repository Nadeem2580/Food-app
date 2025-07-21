import { useEffect } from "react";
import AdminLayout from "../../../Component/Layout/AdminLayout";
import { BASE_URL, toaster } from "../../../Utils/Utility";
import axios from "axios";
import Cookies from "js-cookie"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ApprovalIcon from '@mui/icons-material/Approval';
import { Switch } from "@mui/material";
import { Label } from "@mui/icons-material";

const AdminDashboard = () => {
 const [vendors , setVendors] =useState([])
  const fetchVendor = async() => {
    try {
const vendorsGet = await axios.get(`${BASE_URL}/api/admin-all-vendor`,{
  headers :{
    Authorization : `Bearer ${Cookies.get("token")}`
  }
})
console.log(vendorsGet , "vendorsGet")

setVendors(vendorsGet.data.data)

    } catch (error) {
      toaster({
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  return <AdminLayout>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Full Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Vendor ID</TableCell>
            <TableCell align="center">isVerified</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
       {vendors?.map((vendor , index)=>{
        return(
          <TableRow>

              <TableCell align="center">{vendor.fullName}</TableCell>
              <TableCell align="center">{vendor.email}</TableCell>
              <TableCell align="center">{vendor._id}</TableCell>
              <TableCell align="center">{vendor.isVerified === true? "True" :"False"}</TableCell>
              <TableCell align="center"><Switch   /></TableCell>

          </TableRow>
        )
       }) }
       
       
         <TableBody>

        {/*  {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  
  </AdminLayout>;
};

export default AdminDashboard;
