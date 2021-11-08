const Job = () => import('../components/jobs/Job.vue')
const JobList = () => import('../components/jobs/JobList.vue')
const JobAdd = () => import('../components/jobs/JobAdd.vue')

const route = {
 
  name: 'jobs',
  path: 'metiers',
  icon: 'fa fa-suitcase',
  text: 'Metiers',
  redirect: '/metiers/list',
  component: Job,
  children: [
    {
      name: 'job_list',
      path: 'list',
      component: JobList
    },
    {
      name: 'job_add',
      path: 'ajouter',
      component: JobAdd
    }
  ]
}

export default route
