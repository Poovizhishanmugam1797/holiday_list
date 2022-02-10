import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import axios from "axios";
import './App.css';
import 'react-dropdown/style.css';
const App = () => {
	const url = 'https://www.gov.uk/bank-holidays.json'

	const [data, setData] = useState([])
	const [dropDownData, setDropdownData] = useState("");
	useEffect(() => {
		if (dropDownData === "England") {
			axios.get(url).then(json => {
				setData(json.data["england-and-wales"].events)
			})
		}
		else if (dropDownData === "Scotland") {
			axios.get(url).then(json => {
				setData(json.data["scotland"].events)
			})
		}
		else if (dropDownData === "Northern-Ireland") {
			axios.get(url).then(json => {
				setData(json.data["northern-ireland"].events)
			})
		}
		else {
			axios.get(url).then(json => {
				setData(json.data["england-and-wales"].events)
			})
		}


	}, [dropDownData])
	const options = [
		"England", "Scotland", "Northern-Ireland"
	];
	const dropDownValue = ["England", "Scotland", "Northern-Ireland"]
	const defaultOption = dropDownValue[0];
	const renderTable = () => {

		return data.map(list => {
			return (
				<tr>
					<td>{list.title}</td>
					<td>{list.date}</td>
					<td>{list.notes}</td>
					<td>{list.bunting}</td>
				</tr>
			)
		})
	}

	return (
		<div>
			<div className="row">
				<h3 id="title">Holiday List</h3>
				<Dropdown className="orderBy"
					options={options}
					label={options}
					onChange={(e) => { setDropdownData(e.value) }}
					value={defaultOption}
					placeholder="Select an option" />
			</div>
			<table id="holidayList">
				<thead>
					<tr>
						<th>Title</th>
						<th>Date</th>
						<th>Notes</th>
						<th>Bunting</th>
					</tr>
				</thead>
				<tbody>{renderTable()}</tbody>
			</table>
		</div>
	)
}
export default App;
