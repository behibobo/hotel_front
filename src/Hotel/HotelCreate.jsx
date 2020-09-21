import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, Field } from 'formik';
import Select from 'react-select';
import { hotelActions } from '../_actions';
import { cityService } from '../_services';

function HotelCreate() {
	// const hotels = useSelector(state => state.hotels);
	// const dispatch = useDispatch();

	const [provinceList, setProvinceList] = useState([]);
	const [cityList, setCityList] = useState([]);
	const [provinceLoading, setProvinceLoading] = useState(false);
	const [cityLoading, setCityLoading] = useState(false);

	useEffect(() => {
		setProvinceLoading(true);
		getProvinceData();
		setProvinceLoading(false);

	}, []);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			province_id: '',
			city_id: '',
		},
		onSubmit: values => {
			console.log(values);
		},
	});

	const getProvinceData = () => {
		cityService.getAllProvinces()
			.then((res) => {
				let data = res.map(elm => ({ "label": elm.name, "value": elm.id }))
				setProvinceList(data);
			})
	};

	const getCityData = (id) => {
		cityService.getProvinceCities(id)
			.then((res) => {
				let data = res.map(elm => ({ "label": elm.name, "value": elm.id }))
				setCityList(data);
			})
	};

	const handleChange = (e) => {
		setCityLoading(true);
		formik.values['province_id'] = e.value;
		getCityData(e.value)
		setCityLoading(false);
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="firstName">First Name</label>
			<input
				id="firstName"
				name="firstName"
				type="text"
				onChange={formik.handleChange}
				value={formik.values.firstName}
			/>
			<label htmlFor="lastName">Last Name</label>
			<input
				id="lastName"
				name="lastName"
				type="text"
				onChange={formik.handleChange}
				value={formik.values.lastName}
			/>
			<label htmlFor="email">Email Address</label>
			<input
				id="email"
				name="email"
				type="email"
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<label htmlFor="province">Province</label>
			<Select 
				name="province"
				options={provinceList}
				onChange={handleChange}
				isRtl={true}
				isLoading={provinceLoading}
			/>

			<label htmlFor="city">City</label>
			<Select options={cityList}
				onChange={(e) => formik.values['city_id'] = e.value}
				isRtl={true}
				isLoading={cityLoading}
			/>

			<button type="submit">Submit</button>
		</form>
	);
}

export default HotelCreate;