

export const UserTable = () => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5, 6, 7, 8,].map((key: number) => {
                        return <tr key={key}>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}
