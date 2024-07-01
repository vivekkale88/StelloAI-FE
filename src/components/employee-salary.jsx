import React, { useEffect, useState } from 'react';
import apiClient from '../service/api-service';

const EmployeeSalary = ({ employeeId }) => {
    const [salary, setSalary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await apiClient.get(`/employee/${employeeId}/salary`);
                setSalary(response.data.salary);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalary();
    }, [employeeId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Salary for Employee {employeeId}</h3>
            <p>{salary ? `$${salary}` : 'No salary data available'}</p>
        </div>
    );
};

export default EmployeeSalary;
