<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import Filter from './filter/index.vue';
import Modal from './modal/Modal.vue';
import Pagination from './pagination/index.vue';
import Table from './table/index.vue';

const store = useStore();
const { state, getters } = store;

const dataTable = computed(() => state.tableData.length);
const chosedAll = ref(false);
const chosedList = ref<number[]>([]);
const form = reactive({
	name: '',
	age: '',
	gender: '',
	phone: '',
	address: '',
});

const formEdit = reactive({
	id: '',
	name: '',
	age: '',
	gender: '',
	phone: '',
	address: '',
});

const orderBy = reactive({
	field: 'name',
	isIncrease: true,
});
const searchField = ref('');
const searchProps = ref('');
const genderFilter = ref('');
const page = reactive({ pageSize: '5', pageNumber: 1 });

const show = ref(false);
const showEdit = ref(false);

const paginate = (dataFull: any, size: number, page: number) => {
	return dataFull.slice((page - 1) * size, page * size);
};

const checkContain = (target: string, checkValue: string) => {
	return target.toLowerCase().includes(checkValue.toLowerCase());
};

const sortData = (arrayInput: any, fieldSort: string, increase: boolean) => {
	const sortArr = arrayInput.toSorted((itemA: any, itemB: any) =>
		itemA[fieldSort].toLowerCase().localeCompare(itemB[fieldSort].toLowerCase())
	);
	if (increase) {
		return sortArr;
	}
	return sortArr.toReversed();
};

const dataShow = computed(() => {
	const arrayFilter = state.tableData.filter(
		(item: any) =>
			(genderFilter.value != '' ? item.gender === genderFilter.value : true) &&
			(searchField.value !== ''
				? checkContain(item.name, searchField.value) ||
				  checkContain(item.phone, searchField.value) ||
				  checkContain(item.address, searchField.value)
				: true)
	);

	return paginate(
		sortData(arrayFilter, orderBy.field, orderBy.isIncrease),
		Number(page.pageSize),
		page.pageNumber
	);
});

const closeModal = () => {
	show.value = false;
};

const closeModalEdit = () => {
	showEdit.value = false;
};

const chosedAllShow = computed(() => {
	if (chosedList.value.length === dataShow.value.length) {
		return true;
	} else {
		return false;
	}
});

const onSearch = () => {
	searchField.value = searchProps.value;
};

const addHandle = () => {
	store.commit('addPerson', {
		newPerson: {
			id: Date.now(),
			name: form.name,
			age: form.age,
			gender: form.gender,
			phone: form.phone,
			address: form.address,
		},
	});
	Object.assign(form, {
		name: '',
		age: '',
		gender: '',
		phone: '',
		address: '',
	});
	closeModal();
};
const openModal = () => {
	show.value = true;
};
const changeAmount = (amount: string) => {
	page.pageSize = amount;
};

const onChangePage = (value: number) => {
	page.pageNumber = value;
};

const onChosedAll = () => {
	if (chosedAll.value) {
		chosedAll.value = false;
		chosedList.value = [];
	} else {
		chosedAll.value = true;
		chosedList.value = dataShow.value.map((item: any) => item.id);
	}
};

const onChosedHandle = (value: number) => {
	if (chosedList.value.includes(value)) {
		chosedList.value = chosedList.value.filter((item) => item != value);
		return;
	}
	chosedList.value.push(value);
};

const onDelete = () => {
	store.commit('deletePerson', { deleteArr: chosedList.value });
};

const onDeleteOne = (value: number) => {
	store.commit('deletePerson', { deleteArr: [value] });
};

const onGetDetail = (value: number) => {
	const person = getters.getPerson(value);
	Object.assign(formEdit, {
		id: person.id,
		name: person.name,
		age: person.age,
		gender: person.gender,
		phone: person.phone,
		address: person.address,
	});
	showEdit.value = true;
};

const saveHandle = () => {
	store.commit('updatePerson', formEdit);
	closeModalEdit();
};

const onChangeSort = (value: { fieldSort: string; isIncrease: boolean }) => {
	Object.assign(orderBy, { field: value.fieldSort, isIncrease: value.isIncrease });
};
</script>

<template>
	<div>
		<div class="filter_wrapper">
			<Filter
				@handle-add="openModal"
				@change-amount="changeAmount"
				@delete="onDelete"
				@search="onSearch"
				:amount="page.pageSize"
				v-model:search-field="searchProps"
				v-model:gender-filter="genderFilter"
			/>
		</div>
		<div class="table_wrapper">
			<Table
				:data="dataShow"
				:chosedList="chosedList"
				:chosedAll="chosedAllShow"
				:orderField="orderBy.field"
				:orderDirection="orderBy.isIncrease"
				@chosed-handle="onChosedHandle"
				@chosed-all="onChosedAll"
				@delete-person="onDeleteOne"
				@edit-person="onGetDetail"
				@on-change-sort="onChangeSort"
			/>
		</div>
		<div class="pagination_wrapper">
			<Pagination
				:page-number="page.pageNumber"
				:total-page="Math.ceil(dataTable / Number(page.pageSize))"
				@change-page="onChangePage"
			/>
		</div>
	</div>
	<Modal
		:show="show"
		@closeModal="closeModal"
		@save="addHandle"
	>
		<template #modal-content>
			<div class="mt-1 name_age">
				<div class="flex_style">
					<span class="label_style">Name: </span>
					<input
						v-model="form.name"
						class="input_style"
					/>
				</div>
				<div class="flex_style">
					<span class="label_style">Age: </span>
					<input
						v-model="form.age"
						class="input_style"
					/>
				</div>
			</div>

			<div class="mt-1 flex_style">
				<span class="label_style">Gender: </span>
				<select
					class="input_style"
					name=""
					id=""
					v-model="form.gender"
				>
					<option value="">Chose your gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			</div>

			<div class="mt-1 flex_style">
				<span class="label_style">Phone number: </span>
				<input
					v-model="form.phone"
					class="input_style"
				/>
			</div>
			<div class="mt-1 flex_style">
				<span class="label_style">Address: </span>
				<input
					v-model="form.address"
					class="input_style"
				/>
			</div>
		</template>
	</Modal>

	<!-- modal Edit -->
	<Modal
		:show="showEdit"
		@closeModal="closeModalEdit"
		@save="saveHandle"
	>
		<template #modal-content>
			<div class="mt-1 name_age">
				<div class="flex_style">
					<span class="label_style">Name: </span>
					<input
						v-model="formEdit.name"
						class="input_style"
					/>
				</div>
				<div class="flex_style">
					<span class="label_style">Age: </span>
					<input
						v-model="formEdit.age"
						class="input_style"
					/>
				</div>
			</div>

			<div class="mt-1 flex_style">
				<span class="label_style">Gender: </span>
				<select
					class="input_style"
					name=""
					id=""
					v-model="formEdit.gender"
				>
					<option value="">Chose your gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>
			</div>

			<div class="mt-1 flex_style">
				<span class="label_style">Phone number: </span>
				<input
					v-model="formEdit.phone"
					class="input_style"
				/>
			</div>
			<div class="mt-1 flex_style">
				<span class="label_style">Address: </span>
				<input
					v-model="formEdit.address"
					class="input_style"
				/>
			</div>
		</template>
	</Modal>
</template>
<style>
.pagination_wrapper {
	display: flex;
	justify-content: flex-end;
}

.table_wrapper {
	margin-top: 1rem;
}

.pagination_wrapper {
	margin-top: 1rem;
}

.input_style {
	border-radius: 5px;
	border: 1px solid #331515;
	padding: 5px 10px;
	font-size: 12px;
	flex-grow: 1;
}

.label_style {
	font-weight: bold;
	margin-right: 5px;
	width: 120px;
	display: block;
}

.name_age {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.flex_style {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
