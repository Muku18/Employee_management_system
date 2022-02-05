const mysql = require('mysql');
const Pool = require('mysql/lib/Pool');
const date = require('date-and-time')
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.assignProject = (req, res) => {
    console.log("I am assign project");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from project", (err, rows) => {
            connection.release();
            if (!err) {

                res.render('project', { rows });
            }
            else {
                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
            }
        });

    });
}



// exports.createProject = (req, res) => {
//     console.log("Hello world1");
//     const { pname, dept_id, funds, pid } = req.body;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("INSERT INTO project SET pid = ?,dept_id = ?,funds = ?,pname = ?", [pid, dept_id, funds, pname], (err, result) => {
//             connection.release();
//             if (err) {
//                 throw err;
//             }
//             else {
//                 res.render('project', { alert: 'project assigned successfully.' })
//             }
//             console.log("department inserted with id as  : ", result.insertId);

//         });
//     });
// }



// exports.createProject = (req, res) => {
//     console.log("i am create project");
//     const { pname, dept_id, funds, pid } = req.body;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("INSERT INTO project SET pid = ?,dept_id = ?,funds = ?,pname = ?", [pid, dept_id, funds, pname], (err, result) => {
//             connection.release();
//             if (err) {
//                 throw err;
//             }

//             else {

//                 pool.getConnection((err, connection) => {
//                     if (err) {
//                         console.log("error in database connection");
//                     }
//                     console.log("connected to database as id " + connection.threadId);

//                     connection.query("SELECT * from project", (err, rows) => {
//                         connection.release();
//                         if (!err) {

//                             res.render('project', { rows, alert: "Project assigned" });
//                         }
//                         else {
//                             throw err;
//                         }
//                     });

//                 });

//             }

//         });
//     });
// }



exports.createProject = (req, res) => {
    console.log("i am create project");
    const { pname, dept_id, funds, pid } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(`select pid from project where pid = ${pid}`, (err, rows) => {
            if (!err) {
                if (!rows.length) {
                    if (dept_id === '') {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);

                            connection.query("INSERT INTO project SET pid = ?,funds = ?,pname = ?", [pid,funds, pname], (err, result) => {
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

                                        connection.query("SELECT * from project", (err, rows) => {
                                            connection.release();
                                            if (!err) {

                                                res.render('project', { rows, alert: "Project assigned with no department assign it" });
                                            }
                                            else {
                                                throw err;
                                            }
                                        });

                                    });

                                }

                            });


                        });

                    }
                    else {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);

                            connection.query(`select * from department where dept_id = ${dept_id}`, (err, rows) => {
                                if (!err) {
                                    if (!rows.length) {
                                        pool.getConnection((err, connection) => {
                                            if (err) {
                                                console.log("Error in database connection");
                                            }
                                            console.log("connected to database as id " + connection.threadId);
                                            connection.query(`select * from project`, (err, rows) => {
                                                connection.release();
                                                if (err) {
                                                    throw err;
                                                }
                                                else {
                                                    res.render('project', { rows, alert: "No department of this id exists. can't assign project" });
                                                }
                                            })
                                        });
                                    }
                                    else {
                                        pool.getConnection((err, connection) => {
                                            if (err) {
                                                console.log("error in database connection");
                                            }
                                            console.log("connected to database as id " + connection.threadId);

                                            connection.query("INSERT INTO project SET pid = ?,dept_id = ?,funds = ?,pname = ?", [pid, dept_id, funds, pname], (err, result) => {
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

                                                        connection.query("SELECT * from project", (err, rows) => {
                                                            connection.release();
                                                            if (!err) {

                                                                res.render('project', { rows, alert: "Project assigned" });
                                                            }
                                                            else {
                                                                throw err;
                                                            }
                                                        });

                                                    });

                                                }

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
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from project", (err, rows) => {
                            connection.release();
                            if (!err) {

                                res.render('project', { rows, alert: "There can't be a project of same id" });
                            }
                            else {
                                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                            }
                        });

                    });

                }
            }
            else {
                throw err;
            }
        })
    })

}


exports.editProject = (req, res) => {
    console.log("i am edit project")
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from project WHERE pid = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('editproject', { rows });
            }
            else {
                throw err;
            }
        });
    });
}


exports.updateProject = (req, res) => {
    console.log("I am update project");
    const { pname, dept_id, funds } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);
        connection.query(`select * from department where dept_id = ${dept_id}`, (err, rows) => {
            if (!err) {
                if (!rows.length) {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from project WHERE pid = ?", [req.params.id], (err, rows) => {
                            connection.release();
                            if (!err) {
                                res.render('editproject', { rows, alert: "No dept exists of this id. can't update" });
                            }
                            else {
                                throw err;
                            }
                        });
                    });
                }
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);
                        connection.query(`UPDATE project SET  dept_id = ?, funds = ? , pname = ? WHERE pid = ? `, [dept_id, funds, pname, req.params.id], (err, rows) => {
                            connection.release();
                            if (!err) {
                                pool.getConnection((err, connection) => {
                                    if (err) {
                                        console.log("error in database connection");
                                    }
                                    console.log("connected to database as id " + connection.threadId);

                                    connection.query("SELECT * from project WHERE pid = ?", [req.params.id], (err, rows) => {
                                        connection.release();
                                        if (!err) {
                                            res.render('editproject', { rows, alert: 'project updated successfully.' });
                                        }
                                        else {
                                            throw err;
                                        }

                                    });

                                });



                            }
                            else {
                                throw err;
                            }

                        });
                    })

                }
            }
            else {
                throw err;
            }
        })
    })
}



exports.deleteProject = (req, res) => {
    console.log("i am delete Project");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("DELETE  from project WHERE pid = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {

                res.redirect('/employee/assignproject');
            }
            else {
                throw err;
            }
        });
    });
}


// ===== Project complete ====== //






exports.assignDepartment = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id", (err, rows) => {
            connection.release();
            if (!err) {

                res.render('department', { rows });
            }
            else {
                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
            }


        });

    });
}



exports.sortDepartment = (req, res) => {
    console.log("Hello world234");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        let sortDep = req.body.sort;
        console.log(`${sortDep}`);
        let SQL = `SELECT * FROM department ORDER BY ${sortDep}`;
        console.log(`${SQL}`);
        connection.query(`SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id ORDER BY ${sortDep} `, (err, rows) => {
            connection.release();
            if (!err) {
                res.render('department', { rows });

            }
            else {
                console.log('error')
            }
            console.log("data : ", rows);

        });
    });
}

exports.searchDepartment = (req, res) => {
    console.log("Hello worldxxxxxxxxxxxxx");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        let searchDep = req.body.search;
        connection.query("SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id WHERE dept_name LIKE ?", ['%' + searchDep + '%'], (err, rows) => {
            connection.release();
            console.log(rows);
            if (!err) {
                res.render('department', { rows });
            }
            else {
                console.log('error')
            }


        });
    });
}



exports.createDepartment = (req, res) => {
    console.log("I am create Department");
    const { dept_name, dept_id, no_of_employees, mgr_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(`SELECT dept_id from department where dept_id = ${dept_id}`, (err, rows) => {
            connection.release();
            if (!err) {
                if (!rows.length) {

                    if (mgr_id === '') {
                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);

                            connection.query("INSERT INTO department SET dept_id = ?,dept_name = ?", [dept_id, dept_name], (err, result) => {
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

                                        connection.query("SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id", (err, rows) => {
                                            connection.release();
                                            console.log(`${rows}`);
                                            if (!err) {

                                                res.render('department', { rows, alert: "Department created with no manager assign it" });
                                            }
                                            else {
                                                throw err;
                                            }
                                        });

                                    });
                                }
                            });
                        });
                    }
                    else {



                        pool.getConnection((err, connection) => {
                            if (err) {
                                res.status(500).send('Internal server error');
                            }
                            console.log("connected to database as id " + connection.threadId);
                            connection.query(`select * from employee where id = ${mgr_id}`, (err, rows) => {
                                if (!err) {
                                    if (!rows.length) {

                                        pool.getConnection((err, connection) => {
                                            if (err) {
                                                console.log("error in database connection");
                                            }
                                            console.log("connected to database as id " + connection.threadId);

                                            connection.query("INSERT INTO department SET dept_id = ?,dept_name = ?", [dept_id, dept_name], (err, result) => {
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

                                                        connection.query("SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id", (err, rows) => {
                                                            connection.release();
                                                            console.log(`${rows}`);
                                                            if (!err) {

                                                                res.render('department', { rows, alert: "No manager exists of this id . update it" });
                                                            }
                                                            else {
                                                                throw err;
                                                            }
                                                        });

                                                    });
                                                }
                                            });
                                        });
                                    }
                                    else {

                                        pool.getConnection((err, connection) => {
                                            if (err) {
                                                console.log("error in database connection");
                                            }
                                            console.log("connected to database as id " + connection.threadId);

                                            connection.query("INSERT INTO department SET dept_id = ?,dept_name = ?,mgr_id = ?", [dept_id, dept_name, mgr_id], (err, result) => {
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

                                                        connection.query("SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id;", (err, rows) => {
                                                            connection.release();
                                                            console.log(`${rows}`);
                                                            if (!err) {

                                                                res.render('department', { rows, alert: "Department started successfully" });
                                                            }
                                                            else {
                                                                throw err;
                                                            }
                                                        });

                                                    });
                                                }
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
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT department.*, count(employee.id) as count FROM employee RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id", (err, rows) => {
                            connection.release();
                            if (!err) {

                                res.render('department', { rows, alert: "There cannot be a employee of same dept id" });
                            }
                            else {
                                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                            }


                        });

                    });

                }
            }
            else {
                throw err;
            }
        })
    })

}

// exports.createDepartment = (req, res) => {
//     console.log("Hello world1");
//     const { dept_name, dept_id, no_of_employees, mgr_id } = req.body;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             res.status(500).send('Internal server error');
//         }
//         console.log("connected to database as id " + connection.threadId);
//         connection.query(`select * from employee where id = ${mgr_id}`, (err, rows) => {
//             if (!err) {
//                 if (!rows.length) {

//                     pool.getConnection((err, connection) => {
//                         if (err) {
//                             console.log("error in database connection");
//                         }
//                         console.log("connected to database as id " + connection.threadId);

//                         connection.query("INSERT INTO department SET dept_id = ?,dept_name = ?,count = ?", [dept_id, dept_name, no_of_employees], (err, result) => {
//                             connection.release();
//                             if (err) {
//                                 throw err;
//                             }
//                             else {
//                                 pool.getConnection((err, connection) => {
//                                     if (err) {
//                                         console.log("error in database connection");
//                                     }
//                                     console.log("connected to database as id " + connection.threadId);

//                                     connection.query("SELECT * from department ", (err, rows) => {
//                                         connection.release();
//                                         if (!err) {

//                                             res.render('department', { rows, alert: "No manager exists of this id . update it" });
//                                         }
//                                         else {
//                                             console.log('error')
//                                         }


//                                     });

//                                 });
//                             }
//                             console.log("department inserted with id as  : ", result.insertId);

//                         });
//                     });
//                 }
//                 else {

//                     pool.getConnection((err, connection) => {
//                         if (err) {
//                             console.log("error in database connection");
//                         }
//                         console.log("connected to database as id " + connection.threadId);

//                         connection.query("INSERT INTO department SET dept_id = ?,dept_name = ?,count = ?,mgr_id = ?", [dept_id, dept_name, no_of_employees, mgr_id], (err, result) => {
//                             connection.release();
//                             if (err) {
//                                 throw err;
//                             }
//                             else {
//                                 pool.getConnection((err, connection) => {
//                                     if (err) {
//                                         console.log("error in database connection");
//                                     }
//                                     console.log("connected to database as id " + connection.threadId);

//                                     connection.query("SELECT * from department ", (err, rows) => {
//                                         connection.release();
//                                         if (!err) {

//                                             res.render('department', { rows, alert: "Department started successfully" });
//                                         }
//                                         else {
//                                             console.log('error')
//                                         }
//                                     });

//                                 });
//                             }
//                             console.log("department inserted with id as  : ", result.insertId);

//                         });
//                     });
//                 }

//             }
//             else {
//                 console.log("error in fetching");
//             }
//         });

//     });

// }

exports.editDepartment = (req, res) => {
    console.log("i am edit department");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from department WHERE dept_id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('editdepartment', { rows });
            }
            else {
                throw err;
            }
        });
    });
}

// exports.updateDepartment = (req, res) => {
//     const { dept_id, dept_name, no_of_employees, mgr_id } = req.body;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("UPDATE department SET dept_id = ?, dept_name = ?, count = ?, mgr_id = ? WHERE dept_id = ?", [dept_id, dept_name, no_of_employees, mgr_id, req.params.id], (err, rows) => {
//             console.log("111");
//             connection.release();
//             if (!err) {


//                 pool.getConnection((err, connection) => {
//                     console.log("2");
//                     if (err) {
//                         console.log("error in database connection");
//                     }
//                     console.log("connected to database as id " + connection.threadId);

//                     connection.query("SELECT * from department WHERE dept_id = ?", [req.params.id], (err, rows) => {
//                         connection.release();
//                         if (!err) {
//                             res.render('editdepartment', { rows, alert: 'Department updated successfully.' });
//                         }
//                         else {
//                             console.log('error')
//                         }

//                     });

//                 });



//             }
//             else {
//                 console.log('error')
//             }
//             console.log("data : ", rows);

//         });

//     });
// }


exports.updateDepartment = (req, res) => {
    console.log("i am update department");
    const { dept_name, mgr_id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query(`select * from employee where id = ${mgr_id}`, (err, rows) => {
            if (!err) {
                if (!rows.length) {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from department WHERE dept_id = ?", [req.params.id], (err, rows) => {
                            connection.release();
                            if (!err) {
                                res.render('editdepartment', { rows, alert: 'No manager exists of such id' });
                            }
                            else {
                                throw err;
                            }

                        });

                    });
                }
                else {

                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);
                        connection.query("UPDATE department SET  dept_name = ?, mgr_id = ? WHERE dept_id = ? ", [dept_name, mgr_id, req.params.id], (err, rows) => {
                            console.log("111");
                            connection.release();
                            if (!err) {
                                pool.getConnection((err, connection) => {
                                    if (err) {
                                        console.log("error in database connection");
                                    }
                                    console.log("connected to database as id " + connection.threadId);

                                    connection.query("SELECT * from department WHERE dept_id = ?", [req.params.id], (err, rows) => {
                                        connection.release();
                                        if (!err) {
                                            res.render('editdepartment', { rows, alert: 'Department updated successfully.' });
                                        }
                                        else {
                                            throw err;
                                        }

                                    });

                                });



                            }
                            else {
                                throw err;
                            }
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



exports.deleteDepartment = (req, res) => {
    console.log("i am delete department");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("DELETE  from department WHERE dept_id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {

                res.redirect('/employee/assigndepartment');
            }
            else {
                throw err;
            }
        });
    });
}


// ===== department complete ===== //






// exports.assignDesignation = (req, res) => {
//     console.log('hey');
//     res.render('designation');
// }

exports.assignDesignation = (req, res) => {
    console.log("I am assign designation")
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from designation ", (err, rows) => {
            connection.release();
            if (!err) {

                res.render('designation', { rows });
            }
            else {
                throw err;
            }


        });

    });
}

exports.createDesignation = (req, res) => {
    console.log("I am create Designation");
    const { des_name, did, sal } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(`SELECT did from Designation where did = ${did}`, (err, rows) => {
            if (!err) {
                if (!rows.length) {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("INSERT INTO designation SET did = ?,des_name = ?,sal = ?", [did, des_name, sal], (err, result) => {
                            connection.release();
                            if (err) {
                                throw err;
                            }
                            else {
                                // res.render('designation', { alert: 'designation added successfully.' })
                                pool.getConnection((err, connection) => {
                                    if (err) {
                                        console.log("error in database connection");
                                    }
                                    console.log("connected to database as id " + connection.threadId);

                                    connection.query("SELECT * from designation", (err, rows) => {
                                        connection.release();
                                        if (!err) {

                                            res.render('designation', { rows, alert: "Designation assigned" });
                                        }
                                        else {
                                            throw err;
                                        }
                                    });

                                });
                            }
                        });
                    });

                }
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from designation ", (err, rows) => {
                            connection.release();
                            if (!err) {

                                res.render('designation', { rows, alert: "There can't be a designation of same id" });
                            }
                            else {
                                throw err;
                            }


                        });

                    });

                }

            }
            else {
                throw err;
            }
        })
    })

}

exports.editDesignation = (req, res) => {
    console.log("i am edit designation");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from designation WHERE did = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('editdesignation', { rows });
            }
            else {
                throw err;
            }
        });

    });
}



exports.updateDesignation = (req, res) => {
    console.log("i am update designation");
    const { des_name, sal } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("UPDATE designation SET  des_name = ?, sal = ? WHERE did = ?", [des_name, sal, req.params.id], (err, rows) => {

            connection.release();
            if (!err) {


                pool.getConnection((err, connection) => {

                    if (err) {
                        console.log("error in database connection");
                    }
                    console.log("connected to database as id " + connection.threadId);

                    connection.query("SELECT * from designation WHERE did = ?", [req.params.id], (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render('editdesignation', { rows, alert: 'Designation updated successfully.' });
                        }
                        else {
                            throw err;
                        }

                    });

                });
            }
            else {
                throw err;
            }
        });

    });
}

exports.deleteDesignation = (req, res) => {
    console.log("i am delete designation");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("DELETE  from designation WHERE did = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {

                res.redirect('/employee/assigndesignation');
            }
            else {
                throw err;
            }
        });
    });
}

exports.workProject = (req, res) => {
    console.log("i am work project");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from works_on", (err, rows) => {
            connection.release();
            if (!err) {

                res.render('workproject', { rows });
            }
            else {
                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
            }


        });

    });

}



// exports.createworkProject = (req, res) => {
//     console.log("i am create work project");
//     const { id, pid, hours } = req.body;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         connection.query("INSERT INTO works_on SET id = ?,pid = ?,hours = ?", [id, pid, hours], (err, result) => {
//             connection.release();
//             if (err) {
//                 throw err;
//             }
//             else {
//                 res.render('workproject', { alert: 'project assigned successfully.' })
//             }
//         });
//     });
// }

// exports.createworkProject = (req, res) => {
//     console.log("I am update Work Project");
//     const { id, pid, hours } = req.body;
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.log("Error in database connection");
//         }
//         console.log("Connect with database with id as ", connection.threadId);
//         connection.query(`select * from employee, project where employee.id = ${id} and project.pid = ${pid}`, (err, rows) => {
//             connection.release();
//             if (!err) {
//                 if (!rows.length) {
//                     pool.getConnection((err, connection) => {
//                         connection.query(`SELECT * from employee,works_on,project
//                     where employee.id = works_on.id and project.pid = works_on.pid`, (err, rows) => {
//                             connection.release();
//                             if (!err) {
//                                 res.render('workproject', { rows, alert: "project or employee id do not exists can't insert" })
//                             }
//                             else {
//                                 throw err;
//                             }

//                         });
//                     });
//                 }
//                 else {
//                     pool.getConnection((err, connection) => {
//                         if (err) {
//                             console.log("error in database connection");
//                         }
//                         console.log("connected to database as id " + connection.threadId);

//                         connection.query("INSERT INTO works_on SET id = ?,pid = ?,hours = ?", [id, pid, hours], (err, result) => {
//                             connection.release();
//                             if (err) {
//                                 throw err;
//                             }
//                             else {
//                                 pool.getConnection((err, connection) => {
//                                     connection.query(`SELECT * from employee,works_on,project
//                                 where employee.id = works_on.id and project.pid = works_on.pid`, (err, rows) => {
//                                         connection.release();
//                                         if (!err) {
//                                             res.render('workproject', { rows, alert: 'project assigned successfully.' });
//                                         }
//                                         else {
//                                             throw err;
//                                         }

//                                     });
//                                 });

//                             }
//                         });
//                     });
//                 }
//             }
//             else {
//                 throw err;
//             }
//         });
//     });
// }


exports.createworkProject = (req, res) => {
    console.log("I am update Work Project");
    const { id, pid, hours } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(`select * from works_on where id = ${id} and pid = ${pid}`, (err, rows) => {
            if (!err) {
                if (!rows.length) {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("Error in database connection");
                        }
                        console.log("Connect with database with id as ", connection.threadId);
                        connection.query(`select * from employee, project where employee.id = ${id} and project.pid = ${pid}`, (err, rows) => {
                            connection.release();
                            if (!err) {
                                if (!rows.length) {
                                    pool.getConnection((err, connection) => {
                                        connection.query(`SELECT * from employee,works_on,project
                                    where employee.id = works_on.id and project.pid = works_on.pid`, (err, rows) => {
                                            connection.release();
                                            if (!err) {
                                                res.render('workproject', { rows, alert: "project or employee id do not exists can't insert" })
                                            }
                                            else {
                                                throw err;
                                            }

                                        });
                                    });
                                }
                                else {
                                    pool.getConnection((err, connection) => {
                                        if (err) {
                                            console.log("error in database connection");
                                        }
                                        console.log("connected to database as id " + connection.threadId);

                                        connection.query("INSERT INTO works_on SET id = ?,pid = ?,hours = ?", [id, pid, hours], (err, result) => {
                                            connection.release();
                                            if (err) {
                                                throw err;
                                            }
                                            else {
                                                pool.getConnection((err, connection) => {
                                                    connection.query(`SELECT * from employee,works_on,project
                                                where employee.id = works_on.id and project.pid = works_on.pid`, (err, rows) => {
                                                        connection.release();
                                                        if (!err) {
                                                            res.render('workproject', { rows, alert: 'project assigned successfully.' });
                                                        }
                                                        else {
                                                            throw err;
                                                        }

                                                    });
                                                });

                                            }
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
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from works_on", (err, rows) => {
                            connection.release();
                            if (!err) {

                                res.render('workproject', { rows, alert: "same pid and id can't be inserted" });
                            }
                            else {
                                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                            }


                        });

                    });

                }

            }
            else {
                throw err;
            }
        })

    })
}





// exports.editworkProject = (req, res) => {
//     console.log("i am edit work project");
//     pool.getConnection((err, connection) => {
//         console.log("i am editworkproject")
//         if (err) {
//             console.log("error in database connection");
//         }
//         console.log("connected to database as id " + connection.threadId);

//         let ids = req.params.id;
//         console.log(ids);

//         connection.query(`SELECT * from employee,works_on,project
//             where employee.id = works_on.id and project.pid = works_on.pid and
//             employee.id = ${ids}`, (err, rows) => {
//             connection.release();
//             if (!err) {
//                 res.render('editworkproject', { rows });
//             }
//             else {
//                 throw err;
//             }
//         });
//     });
// }



exports.editworkProject = (req, res) => {
    console.log("i am edit work project");
    pool.getConnection((err, connection) => {
        console.log("i am editworkproject")
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        let ids = req.params.id;
        console.log(ids);

        connection.query(`SELECT * from employee,works_on,project
            where employee.id = works_on.id and project.pid = works_on.pid and
            employee.id = ${ids}`, (err, rows) => {
            connection.release();
            if (!err) {
                if (!rows.length) {

                    pool.getConnection((err, connection) => {
                        console.log("i am editworkproject")
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        let ids = req.params.id;
                        console.log(ids);

                        connection.query(`SELECT * from works_on where 
                                works_on.id = ${ids}`, (err, rows) => {
                            connection.release();
                            console.log(rows);
                            if (!err) {
                                if (!rows.length) {

                                    pool.getConnection((err, connection) => {
                                        console.log("i am editworkproject")
                                        if (err) {
                                            console.log("error in database connection");
                                        }
                                        console.log("connected to database as id " + connection.threadId);

                                        let ids = req.params.id;
                                        console.log(ids);

                                        connection.query(`SELECT * from works_on where pid = ${req.params.id1}`, (err, rows) => {
                                            connection.release();
                                            if (!err) {
                                                res.render('editworkproject', { rows });
                                            }
                                            else {
                                                throw err;
                                            }
                                        });
                                    });

                                }
                                else {
                                    res.render('editworkproject', { rows });
                                }
                            }
                            else {
                                throw err;
                            }
                        });
                    });

                }
                else {
                    res.render('editworkproject', { rows });
                }
            }
            else {
                throw err;
            }
        });
    });
}










exports.updateworkProject = (req, res) => {
    const { id, pid, hours } = req.body;
    console.log("I am update Work Project");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error in database connection");
        }
        console.log("Connect with database with id as ", connection.threadId);
        connection.query(`select * from employee, project where employee.id = ${id} and project.pid = ${pid}`, (err, rows) => {
            connection.release();
            if (!err) {
                if (!rows.length) {
                    pool.getConnection((err, connection) => {
                        connection.query(`SELECT * from employee,works_on,project
                        where employee.id = works_on.id and project.pid = works_on.pid and
                        works_on.id = ${id}`, (err, rows) => {
                            connection.release();
                            if (!err) {
                                res.render('editworkproject', { rows, alert: "project or employee id do not exists" })
                            }
                            else {
                                throw err;
                            }

                        });
                    });
                }
                else {
                    pool.getConnection((err, connection) => {
                        connection.query(`UPDATE works_on SET id = ?,pid = ?,hours = ? where works_on.id = ?`, [id, pid, hours, req.params.id], (err, rows) => {
                            connection.release();
                            console.log("Hello World");
                            console.log(rows);
                            if (!err) {
                                pool.getConnection((err, connection) => {
                                    console.log("i am editworkproject")
                                    if (err) {
                                        console.log("error in database connection");
                                    }
                                    console.log("connected to database as id " + connection.threadId);

                                    let ids = req.params.id;
                                    console.log(ids);

                                    connection.query(`SELECT * from employee,works_on,project
                                        where employee.id = works_on.id and project.pid = works_on.pid and
                                        works_on.id = ${ids}`, (err, rows) => {
                                        connection.release();
                                        if (!err) {
                                            res.render('editworkproject', { rows, alert: "works on updated successfully" });
                                        }
                                        else {
                                            throw err;
                                        }
                                    });
                                });
                            }
                            else {
                                throw err;
                            }
                        })
                    })
                }
            }
            else {
                throw err;
            }
        });
    });
}








exports.deleteworkproject = (req, res) => {
    console.log("i am delete WorkProject");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("DELETE  from works_on WHERE id = ? and pid = ?", [req.params.id, req.params.id1], (err, rows) => {
            connection.release();
            if (!err) {

                res.redirect('/employee/workproject');
            }
            else {
                throw err;
            }
        });
    });
}











exports.Attendance = (req, res) => {
    console.log("I am assign attendance");
    console.log(req.params.id);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from attendance", (err, rows) => {
            connection.release();
            console.log(rows);
            if (!err) {
                for (let i = 0; i < rows.length; i++) {
                    const start = date.format((new Date(rows[i].start_date)),
                        'YYYY/MM/DD');
                    const end = date.format((new Date(rows[i].end_date)),
                        'YYYY/MM/DD');
                    rows[i].start_date = start;
                    rows[i].end_date = end;
                }
                res.render('attendance', { rows });
            }
            else {
                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
            }
        });

    });
}


exports.createAttendance = (req, res) => {
    console.log("I am create attendance");

    const { leave_id, id, start_date, end_date } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        connection.query(`select leave_id from attendance where leave_id = ${leave_id}`, (err, rows) => {
            if (!err) {
                if (!rows.length) {
                    var date_ob = new Date();
                    var day = ("0" + date_ob.getDate()).slice(-2);
                    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                    var year = date_ob.getFullYear();

                    var current_date = year + "-" + month + "-" + day;
                    console.log(current_date);

                    var cd = new Date(current_date);
                    console.log(cd);
                    var sd = new Date(start_date);
                    console.log(sd);
                    var ed = new Date(end_date);
                    console.log(ed);

                    if (cd.getTime() > sd.getTime()) {
                        if (cd.getTime() < ed.getTime()) {
                            pool.getConnection((err, connection) => {
                                if (err) {
                                    res.status(500).send('Internal server error');
                                }
                                console.log("connected to database as id " + connection.threadId);
                                connection.query(`select employee.id from employee where id = ${id}`, (err, rows) => {
                                    if (!err) {
                                        if (!rows.length) {
                                            res.render('attendance', { rows, alert: "No Employee exists of this id" });
                                        }
                                        else {

                                            pool.getConnection((err, connection) => {
                                                if (err) {
                                                    console.log("error in database connection");
                                                }
                                                console.log("connected to database as id " + connection.threadId);

                                                connection.query("INSERT INTO attendance SET leave_id = ?,emp_id = ?,start_date = ?,end_date = ?,status = 'onleave' ", [leave_id, id, start_date, end_date], (err, result) => {
                                                    connection.release();
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    else {
                                                        pool.getConnection((err, connection) => {
                                                            if (err) {
                                                                throw err;
                                                            }
                                                            console.log("connected to database as id " + connection.threadId);

                                                            console.log(`${rows}`);
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) {
                                                                        throw err;
                                                                    }
                                                                    connection.query("SELECT * from attendance", (err, rows) => {
                                                                        connection.release();
                                                                        if (!err) {
                                                                            for (let i = 0; i < rows.length; i++) {
                                                                                const start = date.format((new Date(rows[i].start_date)),
                                                                                    'YYYY/MM/DD');
                                                                                const end = date.format((new Date(rows[i].end_date)),
                                                                                    'YYYY/MM/DD');
                                                                                rows[i].start_date = start;
                                                                                rows[i].end_date = end;
                                                                            }
                                                                            res.render('attendance', { rows, alert: "leave assigned successfully" });
                                                                        }
                                                                        else {
                                                                            res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                                                                        }
                                                                    });
                                                                })


                                                            }
                                                            else {
                                                                throw err;
                                                            }
                                                        });
                                                    }
                                                    console.log("department inserted with id as  : ", result.insertId);

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


                    if (cd.getTime() < sd.getTime()) {
                        if (sd.getTime() < ed.getTime()) {
                            pool.getConnection((err, connection) => {
                                if (err) {
                                    res.status(500).send('Internal server error');
                                }
                                console.log("connected to database as id " + connection.threadId);
                                connection.query(`select employee.id from employee where id = ${id}`, (err, rows) => {
                                    if (!err) {
                                        if (!rows.length) {
                                            res.render('attendance', { rows, alert: "No Employee exists of this id" });
                                        }
                                        else {

                                            pool.getConnection((err, connection) => {
                                                if (err) {
                                                    console.log("error in database connection");
                                                }
                                                console.log("connected to database as id " + connection.threadId);

                                                connection.query("INSERT INTO attendance SET leave_id = ?,emp_id = ?,start_date = ?,end_date = ?,status = 'approach'", [leave_id, id, start_date, end_date], (err, result) => {
                                                    connection.release();
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    else {
                                                        pool.getConnection((err, connection) => {
                                                            if (err) {
                                                                throw err;
                                                            }
                                                            console.log("connected to database as id " + connection.threadId);

                                                            console.log(`${rows}`);
                                                            if (!err) {

                                                                pool.getConnection((err, connection) => {
                                                                    if (err) {
                                                                        throw err;
                                                                    }
                                                                    connection.query("SELECT * from attendance", (err, rows) => {
                                                                        connection.release();
                                                                        if (!err) {
                                                                            for (let i = 0; i < rows.length; i++) {
                                                                                const start = date.format((new Date(rows[i].start_date)),
                                                                                    'YYYY/MM/DD');
                                                                                const end = date.format((new Date(rows[i].end_date)),
                                                                                    'YYYY/MM/DD');
                                                                                rows[i].start_date = start;
                                                                                rows[i].end_date = end;
                                                                            }
                                                                            res.render('attendance', { rows, alert: "leave assigned successfully" });
                                                                        }
                                                                        else {
                                                                            res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                                                                        }
                                                                    });
                                                                });
                                                            }
                                                            else {
                                                                throw err;
                                                            }
                                                        });
                                                    }
                                                    console.log("department inserted with id as  : ", result.insertId);

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



                    if (cd.getTime() > ed.getTime()) {
                        if (sd.getTime() < ed.getTime()) {
                            pool.getConnection((err, connection) => {
                                if (err) {
                                    res.status(500).send('Internal server error');
                                }
                                console.log("connected to database as id " + connection.threadId);
                                connection.query(`select employee.id from employee where id = ${id}`, (err, rows) => {
                                    if (!err) {
                                        if (!rows.length) {
                                            res.render('attendance', { rows, alert: "No Employee exists of this id" });
                                        }
                                        else {

                                            pool.getConnection((err, connection) => {
                                                if (err) {
                                                    console.log("error in database connection");
                                                }
                                                console.log("connected to database as id " + connection.threadId);

                                                connection.query("INSERT INTO attendance SET leave_id = ?,emp_id = ?,start_date = ?,end_date = ?,status = 'active' ", [leave_id, id, start_date, end_date], (err, result) => {
                                                    connection.release();
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    else {
                                                        pool.getConnection((err, connection) => {
                                                            if (err) {
                                                                throw err;
                                                            }
                                                            console.log("connected to database as id " + connection.threadId);

                                                            console.log(`${rows}`);
                                                            if (!err) {

                                                                pool.getConnection((err, connection) => {
                                                                    if (err) {
                                                                        throw err;
                                                                    }
                                                                    connection.query("SELECT * from attendance", (err, rows) => {
                                                                        connection.release();
                                                                        if (!err) {
                                                                            for (let i = 0; i < rows.length; i++) {
                                                                                const start = date.format((new Date(rows[i].start_date)),
                                                                                    'YYYY/MM/DD');
                                                                                const end = date.format((new Date(rows[i].end_date)),
                                                                                    'YYYY/MM/DD');
                                                                                rows[i].start_date = start;
                                                                                rows[i].end_date = end;
                                                                            }
                                                                            res.render('attendance', { rows, alert: "leave assigned successfully" });
                                                                        }
                                                                        else {
                                                                            res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                                                                        }
                                                                    });
                                                                })
                                                            }
                                                            else {
                                                                throw err;
                                                            }
                                                        });
                                                    }
                                                    console.log("department inserted with id as  : ", result.insertId);

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

                    if (ed.getTime() < sd.getTime()) {
                        {

                            pool.getConnection((err, connection) => {
                                if (err) {
                                    console.log("error in database connection");
                                }
                                console.log("connected to database as id " + connection.threadId);

                                connection.query("SELECT * from attendance", (err, rows) => {
                                    connection.release();
                                    if (!err) {
                                        for (let i = 0; i < rows.length; i++) {
                                            const start = date.format((new Date(rows[i].start_date)),
                                                'YYYY/MM/DD');
                                            const end = date.format((new Date(rows[i].end_date)),
                                                'YYYY/MM/DD');
                                            rows[i].start_date = start;
                                            rows[i].end_date = end;
                                        }
                                        res.render('attendance', { rows, alert: "please enter correct date" });
                                    }
                                    else {
                                        res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                                    }
                                });

                            });

                        }
                    }

                }
                else {
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("error in database connection");
                        }
                        console.log("connected to database as id " + connection.threadId);

                        connection.query("SELECT * from attendance", (err, rows) => {
                            connection.release();
                            if (!err) {
                                for (let i = 0; i < rows.length; i++) {
                                    const start = date.format((new Date(rows[i].start_date)),
                                        'YYYY/MM/DD');
                                    const end = date.format((new Date(rows[i].end_date)),
                                        'YYYY/MM/DD');
                                    rows[i].start_date = start;
                                    rows[i].end_date = end;
                                }
                                res.render('attendance', { rows, alert: "There can't be a leave of same id" });
                            }
                            else {
                                res.status(404).send("<h1> 500 internal server error!!! Page not found </h1>");
                            }
                        });

                    });
                }
            }
            else {
                throw err;
            }
        })
    });
}

exports.editAttendance = (req, res) => {
    console.log("i am edit attendance");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("SELECT * from attendance WHERE leave_id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                for (let i = 0; i < rows.length; i++) {
                    const start = date.format((new Date(rows[i].start_date)),
                        'YYYY/MM/DD');
                    const end = date.format((new Date(rows[i].end_date)),
                        'YYYY/MM/DD');
                    rows[i].start_date = start;
                    rows[i].end_date = end;
                }
                console.log(rows);
                res.render('editattendance', { rows });
            }
            else {
                throw err;
            }
        });

    });

}

exports.updateAttendance = (req, res) => {
    console.log("update attendance");


    const { leave_id, id, start_date, end_date } = req.body;

    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();

    var current_date = year + "-" + month + "-" + day;
    console.log(current_date);

    var cd = new Date(current_date);
    console.log(cd);
    var sd = new Date(start_date);
    console.log(sd);
    var ed = new Date(end_date);
    console.log(ed);

    if (cd.getTime() > sd.getTime()) {
        if (cd.getTime() < ed.getTime()) {
            pool.getConnection((err, connection) => {
                if (err) {
                    res.status(500).send('Internal server error');
                }
                console.log("connected to database as id " + connection.threadId);
                connection.query(`select employee.id from employee where id = ${id}`, (err, rows) => {
                    if (!err) {
                        if (!rows.length) {
                            res.render('editattendance', { rows, alert: "No Employee exists of this id" });
                        }
                        else {

                            pool.getConnection((err, connection) => {
                                if (err) {
                                    console.log("error in database connection");
                                }
                                console.log("connected to database as id " + connection.threadId);

                                connection.query("UPDATE attendance SET emp_id = ?,start_date = ?,end_date = ?,status = 'onleave' where leave_id = ?", [id, start_date, end_date, req.params.id], (err, result) => {
                                    connection.release();
                                    if (err) {
                                        throw err;
                                    }
                                    else {
                                        pool.getConnection((err, connection) => {
                                            if (err) {
                                                throw err;
                                            }
                                            console.log("connected to database as id " + connection.threadId);

                                            console.log(`${rows}`);
                                            if (!err) {

                                                res.render('editattendance', { rows, alert: "leave assigned successfully" });
                                            }
                                            else {
                                                throw err;
                                            }
                                        });
                                    }
                                    console.log("department inserted with id as  : ", result.insertId);

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


    if (cd.getTime() < sd.getTime()) {
        pool.getConnection((err, connection) => {
            if (err) {
                res.status(500).send('Internal server error');
            }
            console.log("connected to database as id " + connection.threadId);
            connection.query(`select employee.id from employee where id = ${id}`, (err, rows) => {
                if (!err) {
                    if (!rows.length) {
                        res.render('editattendance', { rows, alert: "No Employee exists of this id" });
                    }
                    else {

                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);

                            connection.query("UPDATE attendance SET emp_id = ?,start_date = ?,end_date = ?,status = 'approach' where leave_id = ?", [id, start_date, end_date, req.params.id], (err, result) => {
                                connection.release();
                                if (err) {
                                    throw err;
                                }
                                else {
                                    pool.getConnection((err, connection) => {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log("connected to database as id " + connection.threadId);

                                        console.log(`${rows}`);
                                        if (!err) {

                                            res.render('editattendance', { rows, alert: "leave assigned successfully" });
                                        }
                                        else {
                                            throw err;
                                        }
                                    });
                                }
                                console.log("department inserted with id as  : ", result.insertId);

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



    if (cd.getTime() > ed.getTime()) {
        pool.getConnection((err, connection) => {
            if (err) {
                res.status(500).send('Internal server error');
            }
            console.log("connected to database as id " + connection.threadId);
            connection.query(`select employee.id from employee where id = ${id}`, (err, rows) => {
                if (!err) {
                    if (!rows.length) {
                        res.render('editattendance', { rows, alert: "No Employee exists of this id" });
                    }
                    else {

                        pool.getConnection((err, connection) => {
                            if (err) {
                                console.log("error in database connection");
                            }
                            console.log("connected to database as id " + connection.threadId);

                            connection.query("UPDATE attendance SET emp_id = ?,start_date = ?,end_date = ?,status = 'active' where leave_id = ?", [id, start_date, end_date, req.params.id], (err, result) => {
                                connection.release();
                                if (err) {
                                    throw err;
                                }
                                else {
                                    pool.getConnection((err, connection) => {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log("connected to database as id " + connection.threadId);

                                        console.log(`${rows}`);
                                        if (!err) {

                                            res.render('editattendance', { rows, alert: "leave assigned successfully" });
                                        }
                                        else {
                                            throw err;
                                        }
                                    });
                                }
                                console.log("department inserted with id as  : ", result.insertId);

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

    if (cd.getTime() > sd.getTime()) {
        if (cd.getTime() > ed.getTime()) {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("error in database connection");
                }
                console.log("connected to database as id " + connection.threadId);

                connection.query("SELECT * from attendance WHERE leave_id = ?", [req.params.id], (err, rows) => {
                    connection.release();
                    if (!err) {
                        for (let i = 0; i < rows.length; i++) {
                            const start = date.format((new Date(rows[i].start_date)),
                                'YYYY/MM/DD');
                            const end = date.format((new Date(rows[i].end_date)),
                                'YYYY/MM/DD');
                            rows[i].start_date = start;
                            rows[i].end_date = end;
                        }
                        console.log(rows);
                        res.render('editattendance', { rows });
                    }
                    else {
                        throw err;
                    }
                });

            });

        }
    }



}


exports.deleteAttendance = (req, res) => {
    console.log("i am delete Attendance");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("error in database connection");
        }
        console.log("connected to database as id " + connection.threadId);

        connection.query("DELETE  from attendance WHERE leave_id = ?", [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {

                res.redirect('/employee/manageattendance');
            }
            else {
                throw err;
            }
        });
    });
}








