

const express = require('express');
const app = express();
const path = require('path');
const { exec } = require('child_process');


	         app.get('/form',(req,res) => {
		 res.sendFile(path.join(__dirname,'/public/index.html'));
	          })
		





		app.get('/runform',(req,res)=> {
			const cname = req.query.con_name
			const imgname = req.query.images

			exec("docker run -dit --name " + cname + " " + imgname,(err,stdout,stderr) => {  
			 	console.log(stdout)
				res.send(stdout);
			})
		})


	app.get('/find',(req,res) =>{ 
	exec('docker ps | tail -n +2',(err,stdout,stderr) => {
		
		let a =  stdout.split("\n");
		
		       
		res.status(200).write("<table border='1' >")
		res.write("<tr>"+"<th>" + " Container ID" + "</th>"+"<th>" + " Image Name" + "</th>"+"<th>" + " Starting time" + "</th>"+"<th>" + " UP Time" + "</th>"+"<th>" + " Container Name" + "</th>"+"</tr>")
		a.forEach((cdetails) => {  
	            let cinfo = cdetails.trim().split(/\s+/);
			       console.log(cinfo);
			       res.status(200).write("<tr>" +"<td>"+cinfo[0] + "</td> "+"<td>" + cinfo[1]+"</td>"+"<td>"+cinfo[3] +" "+cinfo[4]+ " "+cinfo[5]  +"</td>"+"<td>"+ cinfo[6] +" "+ cinfo[7] +" " + cinfo[8] +"</td>"+"<td>" +cinfo[9] + "</td>"+"</tr>");
		})
		res.write("</table>")



	 res.send();
	


	})

	})





	        app.listen(80,(req,res) => {
	        console.log('server started at port 80');
	        })
