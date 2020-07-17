import { http } from './http';
import { success, fail } from './reply';

const ProjectAPI = {
  async find() {
    try {
      const response = await http.get('/users/current/projects');
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async findOne({ id }) {
    try {
      const response = await http.get(`/users/current/projects/${id}`);
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async create({ data }) {
    try {
      const response = await http.post('/users/current/projects', data);
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async update({ id, data }) {
    try {
      const response = await http.put(`/users/current/projects/${id}`, data);
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async remove({ id }) {
    try {
      const response = await http.delete(`/users/current/projects/${id}`);
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },
};

export default ProjectAPI;
