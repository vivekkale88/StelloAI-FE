import React, { useEffect, useState } from 'react';
import apiClient from '../service/api-service';
import TreeNode from './treeNode';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalChange, setTotalChange] = useState(0);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await apiClient.get(`/employees`);
                console.log(response)
                setEmployees(response.data);
                setTotal(calculateTotal(response.data));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    
    const calculateTotal = (employees) => {
        let total = 0;

        const calculateRecursive = (employee) => {
            total += employee.salary ? parseInt(employee.salary) : 0;
            if (employee.subordinate) {
                calculateRecursive(employee.subordinate);
            }
            if (employee.nextSibling) {
                calculateRecursive(employee.nextSibling);
            }
        };

        employees.forEach(employee => calculateRecursive(employee));
        return total;
    };

    const addUpdateSalary = (id, newSalary) => {
        const updateSalaryRecursive = (employee) => {
            if (employee.id === id) {
                employee.salary = newSalary;
            }
            if (employee.subordinate) {
                updateSalaryRecursive(employee.subordinate);
            }
            if (employee.nextSibling) {
                updateSalaryRecursive(employee.nextSibling);
            }
        };

        const updatedEmployees = employees.map(employee => {
            const newEmployee = { ...employee };
            updateSalaryRecursive(newEmployee);
            return newEmployee;
        });

        setEmployees(updatedEmployees);
        handleSalaryChange(updatedEmployees);
    };

    const handleSalaryChange = (employees) => {
        const newTotal = calculateTotal(employees)
        setTotalChange(newTotal - total);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{width: "1000px"}}>
            <h2>Employees Reporting to Manager</h2>
            <ul>
                {employees.map((employee, index) => (
                    <TreeNode key={index} employee={employee} addUpdateSalary = {addUpdateSalary} />
                ))}
            </ul>
            <h2>Total Change in Department Budget: ${totalChange}</h2>
        </div>
    );
};

export default EmployeeList;
