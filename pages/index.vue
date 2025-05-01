<template>
  <main class="h-screen flex flex-col gap-8">

    <form class="form-container mt-6" @submit.prevent="postData">
      <div class="form-group">
        <label for="doctor_id">Insert ID</label>
        <input
            class="form-input"
            name="doctor_id"
            type="number"
            min="1"
            placeholder="Put in internal ID"
            v-model="postid"
            @keydown="preventInvalid"
            @paste.prevent
        />
      </div>
      <div class="form-group">
        <label for="doctor_name">Insert name</label>
        <input
            class="form-input"
            name="doctor_name"
            type="text"
            placeholder="Put in any name"
            v-model="postname"
        />
      </div>
      <div class="form-group">
        <label for="schedule">Insert schedule</label>
        <input
            class="form-input"
            name="schedule"
            type="text"
            placeholder="Put in any weekday"
            v-model="postschedule"
        />
      </div>
      <div class="form-group">
        <label for="salary">Insert salary</label>
        <input
            class="form-input"
            name="salary"
            type="text"
            min="1"
            placeholder="Put in the salary"
            v-model="postsalary"
            @keydown="preventInvalid"
            @paste.prevent
        />
      </div>
      <div class="form-group">
        <label for="profile">Insert profile</label>
        <input
            class="form-input"
            name="profile"
            type="text"
            placeholder="Put in the profile"
            v-model="postprofile"
        />
      </div>
      <button class="btn btn-primary" type="submit">POST</button>
    </form>

    <form class="form-container" @submit.prevent="fetchData">
      <div class="form-group">
        <label for="doctor_id">Filter by ID</label>
        <input
            class="form-input"
            name="doctor_id"
            type="number"
            placeholder="Put in internal ID"
            v-model="getid"
            @keydown="preventInvalid"
            @paste.prevent
        />
      </div>
      <div class="form-group">
        <label for="doctor_name">Filter by name</label>
        <input
            class="form-input"
            name="doctor_name"
            type="text"
            placeholder="Put in any name"
            v-model="getname"
        />
      </div>
      <div class="form-group">
        <label for="schedule">Filter by schedule</label>
        <input
            class="form-input"
            name="schedule"
            type="text"
            placeholder="Put in any weekday"
            v-model="getschedule"
        />
      </div>
      <div class="form-group">
        <label for="salary">Filter by salary</label>
        <input
            class="form-input"
            name="salary"
            type="number"
            placeholder="Put in the salary"
            v-model="getsalary"
            @keydown="preventInvalid"
            @paste.prevent
        />
      </div>
      <div class="form-group">
        <label for="profile">Filter by profile</label>
        <input
            class="form-input"
            name="profile"
            type="text"
            placeholder="Put in the profile"
            v-model="getprofile"
        />
      </div>
      <button class="btn btn-primary" type="submit">Find</button>
    </form>

    <table class="table-base">
      <thead>
      <tr>
        <td class="table-cell">Id</td>
        <td class="table-cell">Name</td>
        <td class="table-cell">Schedule</td>
        <td class="table-cell">Salary</td>
        <td class="table-cell">Profile</td>
        <td class="table-cell">Del</td>
        <td class="table-cell">Upd</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="doctor in data" :key="doctor.doctor_id">
        <td class="table-cell">{{ doctor.doctor_id }}</td>
        <td class="table-cell">{{ doctor.doctor_name }}</td>
        <td class="table-cell">{{ doctor.schedule }}</td>
        <td class="table-cell">{{ doctor.salary }}</td>
        <td class="table-cell">{{ doctor.profile }}</td>
        <td class="table-cell">
          <button @click="deleteData(doctor.doctor_id)" class="btn-delete">X</button>
        </td>
        <td class="table-cell">
          <button @click="updateData(doctor.doctor_id)" class="btn-update">U</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="modal-overlay" v-show="modal">
      <form @submit.prevent="putData" class="form-container">
        <div class="form-group">
          <label for="doctor_id">Update id</label>
          <input class="modal-input" type="number" placeholder="Insert any id" v-model="selectedId" />
        </div>
        <div class="form-group">
          <label for="doctor_name">Update name</label>
          <input class="modal-input" type="text" placeholder="Insert any name" v-model="selectedName" />
        </div>
        <div class="form-group">
          <label for="schedule">Update schedule</label>
          <input class="modal-input" type="text" placeholder="Insert any weekday" v-model="selectedSchedule" />
        </div>
        <div class="form-group">
          <label for="salary">Update salary</label>
          <input class="modal-input" type="number" placeholder="Insert the salary" v-model="selectedSalary" />
        </div>
        <div class="form-group">
          <label for="profile">Update profile</label>
          <input class="modal-input" type="text" placeholder="Insert the profile" v-model="selectedProfile" />
        </div>
        <button @click="modal = false" class="btn btn-primary" type="button">Cancel</button>
        <button @click="modal = false" class="btn btn-primary" type="submit">PUT</button>
      </form>
    </div>

  </main>
</template>

<script setup lang = 'ts'>
import {ref} from 'vue';
const getname = ref<string>('');
const getid = ref<number | null>(null);
const getschedule = ref<string>('');
const getsalary = ref<number | null>(null);
const getprofile = ref<string>('');
const data = ref<any[]>([]);

const postname = ref<string>('');
const postid = ref<number | null>(null);
const postschedule = ref<string>('');
const postsalary = ref<number | null>(null);
const postprofile = ref<string>('');

const selectedId = ref<number | null>(null);
const selectedName = ref<string>('');
const selectedSchedule = ref<string>('');
const selectedSalary = ref<number | null>(null);
const selectedProfile = ref<string>('');

const modal = ref<boolean>(false);

const fetchData = async () => {
  const response = await $fetch('/api/doctors', {
    params: { doctor_name: getname.value,
              doctor_id: getid.value,
              schedule: getschedule.value,
              salary: getsalary.value,
              profile: getprofile.value,
    },
  });
  data.value = response.getus || response;
};

const postData = async () => {
  if (!postname.value || !postid.value || !postschedule.value || !postsalary.value || !postprofile.value) {
    return alert("Please fill in all fields")
  }

  const posts = await $fetch('/api/doctors', {
    method: 'POST',
    body: {
      doctor_name: postname.value,
      doctor_id: postid.value,
      schedule: postschedule.value,
      salary: postsalary.value,
      profile: postprofile.value,
    },
  });
}

const deleteData = async (index: number) => {
  const Delete = await $fetch('/api/doctors/', {
    method: 'DELETE',
    body: {
      doctor_id: index,
    },
  })
}

const updateData = (index: number) => {
  const doctor = data.value.find(doctor => doctor.doctor_id === index);
  if (!doctor) return

  selectedId.value = doctor.doctor_id;
  selectedName.value = doctor.doctor_name;
  selectedSchedule.value = doctor.schedule;
  selectedSalary.value = doctor.salary;
  selectedProfile.value = doctor.profile;

  modal.value = true;
}

const putData = async () => {
  if (selectedId.value === null) return alert("Please select a doctor to update")

  const puts = await $fetch('/api/doctors/', {
    method: 'PUT',
    body: {
      doctor_id: selectedId.value,
      doctor_name: selectedName.value,
      schedule: selectedSchedule.value,
      salary: selectedSalary.value,
      profile: selectedProfile.value,
    },
  })
}

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/protected',
  },
});

function preventInvalid(e: KeyboardEvent):void {
  if (['-', 'e', '+', '.'].includes(e.key)) {
    e.preventDefault();
  }
}

</script>