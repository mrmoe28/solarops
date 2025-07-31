import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      success
      message
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      email
      name
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success
      message
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      name
      createdAt
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      address
      city
      state
      zipCode
      status
      createdAt
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      address
      city
      state
      zipCode
      status
      createdAt
      solarDesign {
        systemSize
        panelCount
      }
      proposal {
        systemCost
        savings
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      address
      city
      state
      zipCode
      status
      createdAt
      permitData {
        permitOfficeUrl
        permitFees
        requirements
        instructions
        applicationLinks
      }
      parcelData {
        parcelNumber
        ownerName
        propertyType
        yearBuilt
        squareFootage
        roofType
        roofAge
        electricalPanel
      }
      solarDesign {
        systemSize
        panelCount
        panelModel
        inverterModel
        annualProduction
        bomList
      }
      projectEquipment {
        id
        quantity
        unitPrice
        totalPrice
        vendorUsed
        notes
        equipment {
          id
          manufacturer
          modelNumber
          name
          description
          specifications
          imageUrl
          standardPrice
          category {
            id
            name
          }
        }
      }
      proposal {
        systemCost
        savings
        paybackPeriod
      }
    }
  }
`;

export const START_PROJECT_ANALYSIS = gql`
  mutation StartProjectAnalysis($projectId: ID!) {
    startProjectAnalysis(projectId: $projectId)
  }
`;

export const AGENT_TASKS = gql`
  query AgentTasks($projectId: ID!) {
    agentTasks(projectId: $projectId) {
      id
      agentType
      status
      error
      attempts
      createdAt
      completedAt
    }
  }
`;

export const AGENT_TASK_UPDATED = gql`
  subscription AgentTaskUpdated($projectId: ID!) {
    agentTaskUpdated(projectId: $projectId) {
      id
      agentType
      status
      error
      attempts
      createdAt
      completedAt
    }
  }
`;

export const EQUIPMENT_FRAGMENT = gql`
  fragment EquipmentFields on Equipment {
    id
    manufacturer
    modelNumber
    name
    description
    specifications
    imageUrl
    standardPrice
    isActive
    category {
      id
      name
      description
    }
    vendorPricing {
      id
      vendorName
      specialPrice
      validFrom
      validUntil
      notes
      isActive
    }
    lowestVendorPrice
  }
`;

export const GET_EQUIPMENT = gql`
  ${EQUIPMENT_FRAGMENT}
  query GetEquipment($filters: EquipmentFilterInput) {
    equipment(filters: $filters) {
      items {
        ...EquipmentFields
      }
      total
      page
      pageSize
      totalPages
    }
  }
`;

export const GET_EQUIPMENT_BY_ID = gql`
  ${EQUIPMENT_FRAGMENT}
  query GetEquipmentById($id: ID!) {
    equipmentById(id: $id) {
      ...EquipmentFields
    }
  }
`;

export const GET_EQUIPMENT_CATEGORIES = gql`
  query GetEquipmentCategories {
    equipmentCategories {
      id
      name
      description
    }
  }
`;
