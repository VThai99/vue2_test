<script setup lang="ts">
import { computed } from 'vue';
import IconSearch from '@/components/icons/IconSearch.vue';
const props = defineProps<{
	amount?: string;
	searchField: string;
	genderFilter: string;
}>();
const amountItem = computed(() => props.amount);
const emit = defineEmits([
	'search',
	'handleAdd',
	'changeAmount',
	'delete',
	'update:searchField',
	'update:genderFilter',
]);
const onChangeAmount = (event: any) => {
	const amount = event.target.value;
	emit('changeAmount', amount);
};
const onInput = (event: any) => {
	emit('update:searchField', event.target.value);
};

const onSelectGender = (event: any) => {
	emit('update:genderFilter', event.target.value);
};
</script>
<template>
	<div class="search_wrapper">
		<div class="search">
			<input
				:value="searchField"
				@input="onInput"
				type="text"
				placeholder="name, address, phone"
			/>
			<button @click="emit('search')"><IconSearch /></button>
		</div>
		<div class="radio_wrapper">
			<div class="label_gender">Gender:</div>
			<div class="radio_check">
				<input
					type="radio"
					id="not_select"
					name="gender"
					:value="''"
					:checked="genderFilter == ''"
					@change="onSelectGender"
				/>
				<label for="not_select">Both</label>
				<input
					type="radio"
					id="gender_male"
					name="gender"
					:value="'Male'"
					:checked="genderFilter == 'Male'"
					@change="onSelectGender"
				/>
				<label for="gender_male">Male</label>
				<input
					type="radio"
					id="gender_female"
					name="gender"
					:value="'Female'"
					:checked="genderFilter == 'Female'"
					@change="onSelectGender"
				/>
				<label for="gender_female">Female</label>
			</div>
		</div>
	</div>

	<div class="feature_wrapper mt-1">
		<button
			class="button_style delete"
			@click="emit('delete')"
		>
			Delete
		</button>
		<button
			class="button_style add"
			@click="emit('handleAdd')"
		>
			Add New
		</button>
	</div>
	<div class="itemPerPage mt-1">
		<select
			:value="amountItem"
			name=""
			id=""
			@change="onChangeAmount"
		>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="20">20</option>
		</select>
	</div>
</template>

<style>
.itemPerPage {
	padding: 0px 20px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.itemPerPage select {
	padding: 3px;
	border-radius: 5px;
}

.feature_wrapper {
	padding: 0px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.button_style {
	background-color: transparent;
	border: 2px solid rgb(29, 25, 25);
	color: rgb(39, 28, 28);
	font-size: 15px;
	border-radius: 10px;
	height: 40px;
	width: 200px;
	transition: all linear 0.2s;
	font-weight: bold;
}

.add:hover {
	background-color: #5855e6;
	border: #5855e6;
	font-size: 16px;
}

.delete:hover {
	background-color: #e04040;
	border: #e04040;
	font-size: 16px;
}
.search_wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.search {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #444040;
	width: 400px;
	border-radius: 10px;
	padding: 5px;
}
.search input {
	flex-grow: 1;
	border: none;
	outline: none;
	padding: 10px;
	font-size: 17px;
	border-radius: inherit;
}
.search button {
	background-color: transparent;
	border: none;
	border-radius: inherit;
	cursor: pointer;
}
.search button:hover {
	transform: scale(1.2);
}
.radio_wrapper{
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
}
.label_gender{
	font-weight: bold;
}

.radio_check{
	display: flex;
	gap: 5px;
}
</style>
