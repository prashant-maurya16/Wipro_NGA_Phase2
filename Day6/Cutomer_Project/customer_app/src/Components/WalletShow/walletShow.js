import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu/menu";

const WalletShow = () => {
    const [wallet, setWallet] = useState([]);
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    let custId  = user.custId;
    

    useEffect(() => {
       
        const fetchWalletData = async () => {
            if (!custId) return; // Avoid making a request if custId is null
            try {
                const response = await axios.get(`http://localhost:5108/showWallet/${custId}`);
                setWallet(response.data);
            } catch (error) {
                console.error("Error fetching wallet data:", error.response ? error.response.data : error.message);
            }
        };

        fetchWalletData();
    }, [custId]);

    return (
        <div>
            <Menu />
            <br />
            <hr />
            <table border="3" align="center">
                <thead>
                    <tr>
                        <th>Wallet Id</th>
                        <th>CustomerId</th>
                        <th>Wallet Type</th>
                        <th>Wallet Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {wallet.length > 0 ? (
                        wallet.map((item, index) => (
                            <tr key={index}>
                                <td>{item.walletId}</td>
                                <td>{item.custId}</td>
                                <td>{item.walletType}</td>
                                <td>{item.walletAmount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" align="center">No wallet data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WalletShow;
