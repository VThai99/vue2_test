<script lang="ts" setup>
defineProps<{
	show: boolean;
}>();
</script>
<template>
	<Transition>
		<div
			v-if="show"
			class="modal_wrapper"
		>
			<div class="modal_content">
				<div class="modal_container">
					<div class="modal_card">
						<div class="modal_header">
							<button
								@click="$emit('closeModal')"
								class="close_modal"
							>
								X
							</button>
						</div>
						<div class="modal_body">
							<slot name="modal-content"></slot>
						</div>
						<div class="modal_footer">
							<button @click="$emit('closeModal')">Cancel</button>
							<button @click="$emit('save')">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>
<style>
.modal_wrapper {
	position: fixed;
	height: 100%;
	top: 0;
	left: 0;
	width: 100%;
	background: rgba(58, 55, 55, 0.164);
	z-index: 9999;
}
.modal_content {
	position: absolute;
	height: 100%;
	width: 100%;
}
.modal_container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.modal_card {
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: white;
	border: none;
	border-radius: 16px;
	width: 900px;
	height: 320px;
}
.modal_header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.modal_body {
	flex-grow: 1;
	color: black;
	margin: 2rem;
}

.modal_footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
}
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s linear;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
