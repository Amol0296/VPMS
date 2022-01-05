const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const moment = require('moment');
const pg = require('pg');
const excelJs = require('exceljs');
// -----------------------------------Vehicle------------------------------------

// Get all vehicle in database
router.get('/',async (req,res,next)=>{
    try {
        const result = await pool.query(`SELECT * FROM vehicle`);
        if(!result){
            return res.status(404).send('Vehicles not found')
        }
        res.status(200).send(result.rows)
    } catch (error) {
        res.send({error})
    }
})

// vehicle_id,number,type,status,charges
// Add new vehicle in database
router.post('/',async (req,res)=>{
    try {
        const {vehicle_number, parking_lot_number,type,status,charges} = req.body;
        const inTime = new Date();
        const result = await pool.query(`INSERT INTO vehicle (vehicle_id,vehicle_number,parking_lot_number,type,status,charges,in_time) 
                                        VALUES (uuid_generate_v4(),$1,$2,$3,$4,$5,$6)`,[vehicle_number,parking_lot_number,type,status,charges,inTime]);
        res.status(201).send(result)

    } catch (error) {
        res.send({error})
    }
})

// Update vehicle in database
router.patch('/',async (req,res)=>{
    const {vehicle_id,status,charges,remark} = req.body;
    const outTime = new Date();
    const result = await pool.query(`UPDATE vehicle SET status=$1,charges=$2,out_time=$3,remark=$4 WHERE vehicle_id=$5`,[status,charges,outTime,remark,vehicle_id]);
    res.send(result)
})

router.get('/category',async (req,res)=>{
    try {
        
        const result = await pool.query(`SELECT * FROM vehicle_category`);
    res.send(result.rows);
    } catch (error) {
        res.send(error)
    }
    
})

// Add vehicle catgory
router.post('/category',async(req,res)=>{
    const { vehicle_category_type} = req.body;
    try {
        if(!vehicle_category_type)
        {
            throw new Error('Category cananot be empty');
        }
        const result = await pool.query(`INSERT INTO vehicle_category (vehicle_category_id,vehicle_category) VALUES (uuid_generate_v4(),$1)`,[vehicle_category_type])
        res.status(201).send(result)
    } catch (error) {
        res.send(error);
    }
    
})

router.get('/search/:id', async(req,res)=>{
    const parkingLotNumber = req.params.id;
    const result = await pool.query(`SELECT * FROM vehicle WHERE parking_lot_number=$1`,[parkingLotNumber])
    res.send(result.rows);
})

router.post("/download",async (req,res)=>{
const {start,end} = req.body;
const start_time = moment(start).format();
const end_time = moment(end).format();
console.log(start_time);
const result = await pool.query(`SELECT * FROM vehicle WHERE in_time >= $1 AND in_time <= $2`,[start_time,end_time]);
const vehicleData = result.rows;
if(vehicleData.length==0){
    return res.send({message:"Data not found"})
}
const workbook = new excelJs.Workbook();
const worksheet = workbook.addWorksheet("Vehicle");
const path = "./files";
worksheet.columns = [
    {header:"Sr. No.",key:"sr_no",width:10},
    {header:"Vehicle Id",key:"vehicle_id",width:10},
    {header:"Vehicle Number",key:"vehicle_number",width:10},
    {header:"Parking Lot Number",key:"parking_lot_number",width:10},
    {header:"Type",key:"type",width:10},
    {header:"Status",key:"status",width:10},
    {header:"Charges",key:"charges",width:10},
    {header:"In Time",key:"in_time",width:10},
    {header:"Out Time",key:"out_time",width:10},
    {header:"Remark",key:"remark",width:10},
];
let counter = 1;
vehicleData.forEach((vehicle)=>{
    vehicle.sr_no = counter;
    worksheet.addRow(vehicle);
    counter++;
});
worksheet.getRow(1).eachCell((cell)=>{
    cell.font = {bold:true};
})

try {
    
    const data = await workbook.xlsx.writeFile(`${path}/vehicle.xlsx`).then(()=>{
        res.send({
            status:"success",
            message:"file successfully download",
            path:`${path}/vehicle.xlsx`,
        });
    });


} catch (error) {
    console.log(error);
    res.send({
        status: "error",
        message: error.message,
       
      });
}


})








// -----------------------------------Users---------------------------------------


module.exports = router;