import React, { useState } from 'react';

const TreeNode = ({ employee, addUpdateSalary }) => {
    if (!employee) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [salary, setSalary] = useState(employee ? employee.salary : 0);

    const handleSalaryChange = (event) => {
        setSalary(event.target.value);
    };

    const updateSalary = (event) => {
        event.preventDefault();
        addUpdateSalary(employee.id, salary);
    }

    if (!employee) return null;
    return (
        <li style={{ listStyleType: "none", textAlign: "left" }}>
            <div style={{ width: "25%", float: "left" }}>
                {employee.name} ({employee.role})
            </div>
            <div style={{ width: "24%", float: "left", textAlign: "center" }}>
                {salary ? salary : 0}
            </div>
            <div style={{ width: "49%", float: "left" }}>
                <form onSubmit={updateSalary}>
                    <input
                        type="number"
                        onChange={handleSalaryChange}
                    />
                    <button type="submit">Update</button>
                </form>
            </div>
            {employee.subordinate && (
                <TreeNode employee={employee.subordinate} addUpdateSalary={addUpdateSalary} />
            )}
            {employee.nextSibling && (
                <TreeNode employee={employee.nextSibling} addUpdateSalary={addUpdateSalary} />
            )}
        </li>
    );
};

export default TreeNode;
