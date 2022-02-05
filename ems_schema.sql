CREATE TABLE `ems`.`employee` ( `id` INT NOT NULL AUTO_INCREMENT , `Name` VARCHAR(50) NOT NULL , `role` VARCHAR(15) NOT NULL , `bonus` INT NOT NULL , `total_salary` INT NOT NULL , `leave_status` VARCHAR(10) NOT NULL , `dept_id` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `ems`.`department` ( `dept_id` INT NOT NULL AUTO_INCREMENT , `dept_name` VARCHAR(50) NOT NULL , `no_of_employees` INT NOT NULL , `mgr_id` INT NOT NULL , PRIMARY KEY (`dept_id`)) ENGINE = InnoDB;




 {{!-- <tr>
     
      <td>2</td>
      <td>Mohammad Luqmann</td>
      <td>AI engineer</td>
      <td>2000</td>
      <td>20000</td>
      <td>0</td>
      <td>22</td>
      <td class="text-end">
          <a href="#" type="button" class="btn btn-success btn-small">View</a>
          <a href="#" type="button" class="btn btn-primary btn-small">Edit</a>
          <a href="#" type="button" class="btn btn-danger btn-small">Delete</a>
      </td>
    </tr>
     <tr>
     
      <td>3</td>
      <td>Mukesh Kumar</td>
      <td>webdev</td>
      <td>1000</td>
      <td>20000</td>
      <td>1</td>
      <td>33</td>
      <td class="text-end">
          <a href="#" type="button" class="btn btn-success btn-small">View</a>
          <a href="#" type="button" class="btn btn-primary btn-small">Edit</a>
          <a href="#" type="button" class="btn btn-danger btn-small">Delete</a>
      </td>
    </tr> --}}

        {{!-- <div class="mb-3">
        <label for="Name" class="form-label">Name</label>
        <i nput type="text" class="form-control" name="name" id="Name" aria-describedby="emailHelp">
    </div>
    <div class="col-6">
        <label for="role" class="form-label">role</label>
        <input type="number" class="form-control" name="role" id="role" aria-describedby="emailHelp">
    </div>

    <div class="col-6">
        <label for="bonus" class="form-label">bonus</label>
        <input type="number" class="form-control" name="bonus" id="bonus" aria-describedby="emailHelp">
    </div>

    <div class="col-6">
        <label for="totalSalary" class="form-label">totalSalary</label>
        <input type="number" class="form-control" name="totalSalary" id="totalSalary" aria-describedby="emailHelp">
    </div>

    <div class="col-6">
        <label for="leaveStatus" class="form-label">leave_status</label>
        <input type="number" class="form-control" name="leaveStatus" id="leaveStatus" aria-describedby="emailHelp">
    </div>

    <div>
        <label for="deptId" class="form-label">dept_id</label>
        <input type="number" class="form-control" name="deptId" id="deptId" aria-describedby="emailHelp">
    </div>


    <button type="submit" class="btn btn-primary">Submit</button> --}}


    
{{!-- sorting --}}
{{!-- <div class="row mb-2">
  <div class="col-6 ">
    <form method = "POST" action = "/" novalidate>
      {{!-- <select id="attributes" name="options">
        <option value="volvo">Name</option>
        <option value="saab">bonus</option>
        <option value="opel">total_salary</option>
      </select> --}}
      <input class="form-control me-2" type="text" name="options" >
      <button class="btn btn-success" type="submit">Sort</button>
    </form>
  </div>
</div> --}}


SELECT count(*),dept_id from employee group by dept_id; 
select d.*,count(*) from employee e,department d group by e.dept_id;
select count(e.id), d.* from employee e,department d where e.dept_id = d.dept_id group by d.dept_id;
select d.*,count(e.id) as count  from employee e,department d where e.dept_id = d.dept_id group by d.dept_id;

SELECT d.*, count(e.id) as count 
FROM employee
RIGHT JOIN department ON e.dept_id = d.dept_id group by d.dept_id;
SELECT department.*, count(employee.id) as count 
FROM employee
RIGHT JOIN department ON employee.dept_id = department.dept_id group by department.dept_id;

 CREATE TRIGGER total_salary ON employee e
 after insert
 as
 update u
 set total_salary = e.bonus + d.sal
 FROM employee e
   INNER JOIN designation d
 on e.role = d.did ;


 select * from employee LEFT JOIN designation ON employee.role = designation.did 
LEFT JOIN department ON employee.dept_id = department.dept_id 
LEFT JOIN ON attendance ON employee.leave_status = attendance.leave_id


select * from employee LEFT JOIN designation ON employee.role = designation.did 
LEFT JOIN department ON employee.dept_id = department.dept_id 
LEFT JOIN attendance ON employee.leave_status = attendance.leave_id
LEFT JOIN works_on ON employee.id = works_on.id
LEFT JOIN project ON project.pid = works_on.pid ;
JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);

select * from employee LEFT JOIN designation ON employee.role = designation.did
        LEFT JOIN department ON employee.dept_id = department.dept_id 
        LEFT JOIN attendance ON employee.leave_status = attendance.leave_id
        LEFT JOIN project ON employee project.pid in (select works_on.pid from employee,works_on where employee.id = works_on.id )
        where employee.id = ${ids}


         {{!-- #====== --}}
      {{#if this.status}}
      <td>{{this.status}}</td>
      {{else}}
      <td>active</td>
      {{/if}}
