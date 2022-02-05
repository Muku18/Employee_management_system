const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



// exports.view = (req, res) => {

//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("SELECT * from employee ", (err, rows) => {
//             connection.release();
//             if (!err) {

//                 res.render('home', { rows });
//             }
//             else {
//                 console.log('error')
//             }
//             // console.log("data : ",rows);

//         });

//     });
// }
exports.about = (req, res) => {
    res.render('about');
}

// exports.view = (req, res) => {

//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("SELECT  * FROM employee LEFT JOIN attendance ON employee.leave_status = attendance.leave_id", (err, rows) => {
//             connection.release();
//             if (!err) {

//                 res.render('home', { rows });
//             }
//             else {
//                 console.log('error')
//             }
//             console.log(rows);

//         });

//     });
// }


exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);
        let SQL = `CALL getemployee()`
        console.log(`${SQL}`);

        connection.query(SQL,true, (err, r) => {
            connection.release();
            console.log("Hello");
       
            if (!err) {
                let rows = r[0]

                res.render('home', { rows });
            }
            else {
                console.log('error')
            }
           

        });

    });
}

exports.find = (req, res) => {
    console.log("Hello world");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        let searchEmp = req.body.search;
        connection.query("SELECT  * FROM employee LEFT JOIN attendance ON employee.leave_status = attendance.leave_id WHERE Name LIKE ?", ['%' + searchEmp + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log('error')
            }
            // console.log("data : ",rows);

        });
    });
}


exports.sort = (req, res) => {
    console.log("Hello world234");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        let sortEmp = req.body.sort;
        console.log(`${sortEmp}`);
        let SQL = `SELECT * FROM employee ORDER BY ${sortEmp}`;
        console.log(`${SQL}`);
        connection.query(`SELECT  * FROM employee LEFT JOIN attendance ON employee.leave_status = attendance.leave_id ORDER BY ${sortEmp} `, (err, rows) => {
            connection.release();
            console.log(rows);
            if (!err) {
                res.render('home', { rows });

            }
            else {
                console.log('error')
            }
            console.log("data : ", rows);

        });
    });
}


exports.form = (req, res) => {
    console.log('hey');
    res.render('adduser');
}

// exports.create = (req,res) => {





//     console.log("Hello world1");
//     const {name,role,bonus,totalSalary,leaveStatus,deptId} = req.body;
//     pool.getConnection((err,connection) => {
//         if(err){
//             res.status(500).send('Internal server error');
//         }
//         console.log("connected to database as id " + connection.threadId);


//         connection.query("INSERT INTO employee SET Name = ?,bonus = ?,total_salary = ?,role = ?,dept_id = ?",[name,bonus,totalSalary,role,deptId],(err,result) => {
//             connection.release();
//             if(err){
//                 throw err;
//             }
//             else{
//                 res.render('adduser',{alert: 'User added successfully.'})
//             }
//             console.log("data inserted with id as  : ",result.insertId);

//         });
//     });
// }

exports.create = (req, res) => {
    console.log("Hello world1");
    const { name, role, bonus, deptId } = req.body;
    console.log(req.body);

    if (role === "" && deptId === "") {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("error in database connection");
            }
            console.log("connected to database as id " + connection.threadId);

            connection.query("INSERT INTO employee SET Name = ?,bonus = ? ", [name, bonus], (err, result) => {
                connection.release();
                if (err) {
                    throw err;
                }
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from employee ", (err, rows) => {
                            connection.release();
                            if (!err) {

                                res.render('adduser', { rows, alert: "Employee created with no role and department" });
                            }
                            else {
                                console.log('error')
                            }


                        });

                    });
                }
                console.log("department inserted with id as  : ", result.insertId);

            });
        });


    }
    else {



        pool.getConnection((err, connection) => {
            if (err) {
                res.status(500).send('Internal server error');
            }
            console.log("connected to database as id " + connection.threadId);
            connection.query(`select * from designation,department where designation.did = ${role} and department.dept_id = ${deptId}`, (err, rows) => {
                if (!err) {
                    if (!rows.length) {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);

                            connection.query("INSERT INTO employee SET Name = ?,bonus = ? ", [name, bonus], (err, result) => {
                                connection.release();
                                if (err) {
                                    throw err;
                                }
                                else {
                                    pool.getConnection((err, connection) => {
                                        if (err) {
                                            console.log("error in database connection");
                                        }
                                        console.log("connected to database as id " + connection.threadId);

                                        connection.query("SELECT * from employee ", (err, rows) => {
                                            connection.release();
                                            if (!err) {

                                                res.render('adduser', { rows, alert: "role id or department do not exists. update it" });
                                            }
                                            else {
                                                console.log('error')
                                            }


                                        });

                                    });
                                }
                                console.log("department inserted with id as  : ", result.insertId);

                            });
                        });
                    }
                    else {
                        console.log(rows);
                        var ts = parseInt(bonus) + parseInt(rows[0].sal)
                        console.log(ts);


                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);
                            connection.query(`INSERT INTO employee SET Name = ?,bonus = ?,total_salary = ${ts},role = ?,dept_id = ?`, [name, bonus, role, deptId], (err, result) => {
                                connection.release();
                                if (err) {
                                    throw err;
                                }
                                else {
                                    res.render('adduser', { alert: 'User added successfully.' })
                                }
                                console.log("data inserted with id as  : ", result.insertId);

                            });
                        });
                    }

                }
                else {
                    throw err;
                }
            });
        });
    }
}







exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from employee WHERE id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('edituser', { rows });
            }
            else {
                console.log('error')
            }
            // console.log("data : ",rows);

        });
        console.log("data");

    });
}



exports.update = (req, res) => {
    const { name, role, bonus, deptId } = req.body;
    console.log(req.body);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);
        connection.query(`select * from designation,department where designation.did = ${role} and department.dept_id = ${deptId}`, (err, rows) => {
            connection.release();
            if (!err) {
                if (!rows.length) {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);
                        connection.query("UPDATE employee SET Name = ?,bonus = ? WHERE id = ?", [name, bonus, req.params.id], (err, rows) => {
                            console.log("1112");
                            connection.release();
                            if (!err) {


                                pool.getConnection((err, connection) => {
                                    console.log("2");
                                    if (err) {
                                        console.log("error in database connection");
                                    }
                                    console.log("connected to database as id " + connection.threadId);

                                    connection.query("SELECT * from employee WHERE id = ?", [req.params.id], (err, rows) => {
                                        connection.release();
                                        if (!err) {
                                            res.render('edituser', { rows, alert: "No role or dept_id exists can't update" });
                                        }
                                        else {
                                            console.log('error')
                                        }
                                        // console.log("data : ",rows);

                                    });

                                });



                            }
                            else {
                                console.log('error')
                            }
                            console.log("data : ", rows);

                        });
                    });
                }
                else {
                    console.log(rows);
                    var ts = parseInt(bonus) + parseInt(rows[0].sal)
                    console.log(ts);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);
                        connection.query(`UPDATE employee SET Name = ?, role = ?, bonus = ?, total_salary = ${ts},dept_id = ? WHERE id = ?`, [name, role, bonus, deptId, req.params.id], (err, rows) => {
                            console.log("111");
                            connection.release();
                            if (!err) {


                                pool.getConnection((err, connection) => {
                                    console.log("2");
                                    if (err) {
                                        console.log("error in database connection");
                                    }
                                    console.log("connected to database as id " + connection.threadId);

                                    connection.query("SELECT * from employee WHERE id = ?", [req.params.id], (err, rows) => {
                                        connection.release();
                                        if (!err) {
                                            res.render('edituser', { rows, alert: 'User updated successfully.' });
                                        }
                                        else {
                                            console.log('error')
                                        }

                                    });

                                });



                            }
                            else {
                                console.log('error')
                            }
                            console.log("data : ", rows);

                        });
                    });
                }

            }
            else {
                throw err;
            }

        });


    });
}



// exports.update = (req, res) => {
//     const { name, role, bonus, totalSalary, leaveStatus, deptId } = req.body;
//     console.log(req.body);
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);
//         connection.query(`select * from designation,department where designation.did = ${role} and department.dept_id = ${deptId}`, (err, rows) => {
//             if (!err) {
//                 if (!rows.length) {
//                     pool.getConnection((err, connection) => {
//                         console.log("2");
//                         if (err) {
//                             console.log("error in database connection");
//                         }
//                         console.log("connected to database as id " + connection.threadId);

//                         connection.query("SELECT * from employee WHERE id = ?", [req.params.id], (err, rows) => {
//                             connection.release();
//                             if (!err) {
//                                 res.render('edituser', { rows, alert: "No role or dept_id exists can't update" });
//                             }
//                             else {
//                                 console.log('error')
//                             }


//                         });

//                     });
//                 }
//                 else {
//                     connection.query("UPDATE employee SET Name = ?, role = ?, bonus = ?, total_salary = ?,dept_id = ? WHERE id = ?", [name, role, bonus, totalSalary, deptId, req.params.id], (err, rows) => {
//                         console.log("111");
//                         connection.release();
//                         if (!err) {


//                             pool.getConnection((err, connection) => {
//                                 console.log("2");
//                                 if (err) {
//                                     console.log("error in database connection");
//                                 }
//                                 console.log("connected to database as id " + connection.threadId);

//                                 connection.query("SELECT * from employee WHERE id = ?", [req.params.id], (err, rows) => {
//                                     connection.release();
//                                     if (!err) {
//                                         res.render('edituser', { rows, alert: 'User updated successfully.' });
//                                     }
//                                     else {
//                                         console.log('error')
//                                     }
//                                 });

//                             });



//                         }
//                         else {
//                             console.log('error')
//                         }
//                         console.log("data : ", rows);

//                     });
//                 }

//             }
//             else {
//                 res.status(500).send("<h1>Internal server error</h1>");
//             }

//         });


//     });
// }


exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("DELETE  from employee WHERE id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {

                res.redirect('/')
            }
            else {
                throw err;
            }
            console.log("data : ", rows);

        });
        console.log("data");

    });
}

// exports.viewall =  (req,res) => {

//     pool.getConnection((err,connection) => {
//         if(err){
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("SELECT * from employee WHERE id = ?",[req.params.id],(err,rows) => {
//             connection.release();
//             if(!err){
//                 res.render('viewuser',{rows});
//             }
//             else{
//                 console.log('error')
//             }
//             // console.log("data : ",rows);

//         });

//     });
// }


// exports.viewall =  (req,res) => {

//     pool.getConnection((err,connection) => {
//         if(err){
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);
//         let ids = req.params.id;
//         console.log(ids);

//         connection.query(`SELECT * from employee,designation,department,works_on,project
//          where 
//          employee.role = designation.did and employee.id = works_on.id and project.pid = works_on.pid 
//          and  employee.dept_id = department.dept_id and employee.id = ${ids}`,(err,rows) => {
//             connection.release();
//             if(!err){
//                 res.render('viewuser',{rows});
//             }
//             else{
//                 console.log('error')
//             }
//             console.log("data : ",rows);

//         });

//     });
// }


// exports.viewall = (req, res) => {

//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);
//         let ids = req.params.id;
//         console.log(ids);

//         connection.query(`SELECT * from employee,designation,department,works_on,project
//          where 
//          employee.role = designation.did and employee.id = works_on.id and project.pid = works_on.pid 
//          and  employee.dept_id = department.dept_id and employee.id = ${ids}`, (err, rows) => {
//             connection.release();
//             if (!err) {

//                 res.render('viewuser', { rows });
//             }
//             else {
//                 console.log('error')
//             }
//             console.log("data : ", rows);

//         });

//     });
// }



// exports.viewall = (req, res) => {

//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);
//         let ids = req.params.id;
//         console.log(ids);

//         connection.query(`SELECT * from employee,designation,department,works_on,project,attendance
//          where 
//          employee.role = designation.did and employee.id = works_on.id and project.pid = works_on.pid 
//          and  employee.dept_id = department.dept_id and employee.leave_status = attendance.leave_id and employee.id = ${ids}`, (err, rows) => {
//             connection.release();
//             if (!err) {

//                 if (!rows.length) {
//                     pool.getConnection((err, connection) => {
//                         if (err) {
//                             console.log("error in database connection");
//                         }
//                         console.log("connected to database as id " + connection.threadId);
//                         let ids = req.params.id;
//                         console.log(ids);

//                         connection.query(`SELECT * from employee,designation,department
//                          where 
//                          employee.role = designation.did and employee.dept_id = department.dept_id and employee.id = ${ids}`, (err, rows) => {
//                             connection.release();
//                             if (!err) {
//                                 if (!rows.length) {




//                                     pool.getConnection((err, connection) => {
//                                         if (err) {
//                                             console.log("error in database connection");
//                                         }
//                                         console.log("connected to database as id " + connection.threadId);
//                                         let ids = req.params.id;
//                                         console.log(ids);

//                                         connection.query(`SELECT * from employee
//                                         where employee.id = ${ids}`, (err, rows) => {
//                                             connection.release();
//                                             if (!err) {

//                                                 res.render('viewuser', { rows });
//                                             }
//                                             else {
//                                                 console.log('error')
//                                             }
//                                             console.log("data : ", rows);

//                                         });

//                                     });
//                                 }
//                                 else {
//                                     res.render('viewuser', { rows });
//                                 }
//                             }
//                             else {
//                                 console.log('error')
//                             }
//                             console.log("data : ", rows);

//                         });

//                     });
//                 }
//                 else {
//                     res.render('viewuser', { rows });
//                 }
//             }
//             else {
//                 console.log('error')
//             }
//             console.log("data : ", rows);

//         });

//     });
// }

exports.viewall = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);
        let ids = req.params.id;
        console.log(ids);

        connection.query(`SELECT * from employee,designation,department,works_on,project,attendance
                 where 
                  employee.role = designation.did and employee.id = works_on.id and project.pid = works_on.pid 
                  and  employee.dept_id = department.dept_id and employee.leave_status = attendance.leave_id and employee.id = ${ids}`, (err, rows) => {
            connection.release();
            if (!err) {

                if (!rows.length) {

                    pool.getConnection((err, connection) => {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);
                            let ids = req.params.id;
                            console.log(ids);

                            connection.query(`select * from employee,works_on,project 
                            where employee.id = works_on.id and project.pid = works_on.pid and employee.id = ${ids}`, (err, rows) => {
                                connection.release();
                                if (!err) {
                                    if (!rows.length) {
                                        pool.getConnection((err, connection) => {
                                            if (err) {
                                                console.log("error in database connection");
                                            }
                                            console.log("connected to database as id " + connection.threadId);
                                            let ids = req.params.id;
                                            console.log(ids);

                                            connection.query(`select * from employee LEFT JOIN designation ON employee.role = designation.did
                            LEFT JOIN department ON employee.dept_id = department.dept_id 
                            LEFT JOIN attendance ON employee.leave_status = attendance.leave_id where employee.id = ${ids}`, (err, rows) => {
                                                connection.release();
                                                if (!err) {

                                                    res.render('viewuser', { rows });
                                                }
                                                else {
                                                    throw err;
                                                }
                                                console.log("data : ", rows);

                                            });

                                        });
                                    }
                                    else {
                                        res.render('viewuser', { rows });
                                    }
                                }
                                else {
                                    throw err;
                                }
                                console.log("data : ", rows);

                            });

                        });

                    });



                }

                else {
                    res.render('viewuser', { rows });
                }
            }
            else {
                throw err;
            }
        });

    });

}








//Department







