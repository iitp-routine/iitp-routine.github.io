
const ROUTINE= {
    "sun": {
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
    },
    "mon": {
        '8': [],
        '9': [],
        '10': ['CS341', 'CS508'],
        '11': ['CS358', 'MC504'],
        '12': ['CS244', 'HS302', 'HS341', 'HS331', 'HS514'],
        '1': [],
        '2': ['CS566'],
        '3': ['CS359', 'CS579'],
        '4': ['CS359', 'CS551'],
        '5': ['CS359'],
        '6': ['CS563'],
    },

    "tue": {
        '8': [],
        '9': ['CS392'],
        '10': ['CS341', 'CS508', 'CS225'],
        '11': ['CS358', 'MC504'],
        '12': ['CS244', 'HS302', 'HS341', 'HS331', 'HS514'],
        '1': [],
        '2': ['CS566'],
        '3': ['CS342', 'CS226'],
        '4': ['CS342', 'CS226', 'CS551'],
        '5': ['CS342', 'CS226'],
        '6': ['CS342'],
    },

    "wed": {
        '8': [],
        '9': ['CS392'],
        '10': ['CS341', 'CS508', 'CS225'],
        '11': ['CS358', 'MC504'],
        '12': ['CS244', 'HS302', 'HS341', 'HS331', 'HS514'],
        '1': [],
        '2': ['CS566'],
        '3': ['CS579'],
        '4': ['CS551'],
        '5': ['CS372', 'CS575'],
        '6': ['CS372', 'CS563'],
    },

    "thu": {
        '8': [],
        '9': ['CS392', 'CS565'],
        '10': ['CS225', 'CS511'],
        '11': ['CS514'],
        '12': ['CS565'],
        '1': [],
        '2': ['CS511'],
        '3': ['CS399', 'CS515'],
        '4': ['CS399', 'CS515'],
        '5': ['CS399', 'CS515', 'CS575'],
        '6': ['CS563'],
    },

    "fri": {
        '8': [],
        '9': ['CS511', 'CS392'],
        '10': ['CS579'],
        '11': ['CS514'],
        '12': ['CS565'],
        '1': [],
        '2': ['CS514'],
        '3': ['CS299', 'CS592'],
        '4': ['CS299', 'CS592'],
        '5': ['CS299', 'CS592', 'CS372'],
        '6': ['CS299'],
    },

    "sat": {
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
    },
}




const FACULTY= [
    {
        id: 1,
        short_name: 'MA',
        name: 'Dr. Mayank Agarwal',
        email: `mayank265@iitp.ac.in`,
    },
    {
        id: 2,
        short_name: 'SKD',
        name: 'Dr. Sourav Kumar Dandapat',
        email: `sourav@iitp.ac.in`,
    },
    {
        id: 3,
        short_name: 'RH',
        name: `Dr. Raju Halder`,
        email: `halder@iitp.ac.in`,
    },
    {
        id: 4,
        short_name: 'ABM',
        name: `Dr. Abyayananda Maiti`,
        email: `abyaym@iitp.ac.in`,
    },
    {
        id: 5,
        short_name: 'SKM',
        name: `Dr. Suman Kumar Maji`,
        email: `smaji@iitp.ac.in`,
    },
    {
        id: 6,
        short_name: 'JM',
        name: `Dr. Jimson Mathew`,
        email: `jimson@iitp.ac.in`,
    },
    {
        id: 7,
        short_name: 'ST',
        name: `Dr. Somanath Tripathy`,
        email: `som@iitp.ac.in`,
    },
    {
        id: 8,
        short_name: 'JC',
        name: `Dr. Joydeep Chandra`,
        email: `joydeep@iitp.ac.in`,
    },
    {
        id: 9,
        short_name: 'SS',
        name: `Dr. Sriparna Saha`,
        email: `sriparna@iitp.ac.in`,
    },
    {
        id: 10,
        short_name: 'RM',
        name: `Dr. Rajiv Misra`,
        email: `rajivm@iitp.ac.in`,
    },
    {
        id: 11,
        short_name: 'SM',
        name: `Dr. Samrat Mondal`,
        email: `samrat@iitp.ac.in`,
    },
    {
        id: 12,
        short_name: 'AM',
        name: `Dr. Arijit Mondal`,
        email: `arijit@iitp.ac.in`,
    },
    {
        id: 13,
        short_name: 'AE',
        name: `Dr. Asif Ekbal`,
        email: `asif@iitp.ac.in`,
    },

]








const COURSE_NAMES= {




    CS102: {
        name: `Programming & DS`,
        teachers: ['MA', 'SKD'],
    },

    CS112: {
        name: `Programming & DS Lab`,
        teachers: ['ABM', 'RH', 'SKM', 'SKD'],
    },

    CS225: {
        name: `Switching Theory`,
        teachers: ['ST', 'JM'],
    },
    CS226: {
        name: `Switching Theory Lab`,
        teachers: ['JM'],
    },
    CS244: {
        name: `Intro.  Data Science`,
        teachers: ['SKD', 'JC'],
    },
    CS299: {
        name: `Innovative Design Lab`,
        teachers: ['All'],
    },
    CS341: {
        name: `Operating System`,
        teachers: ['JM', 'SS'],
    },
    CS342: {
        name: `Operating System Lab`,
        teachers: ['SS'],
    },
    CS358: {
        name: `Computer Network`,
        teachers: ['RM'],
    },
    CS359: {
        name: `Computer Network Lab`,
        teachers: ['RM'],
    },
    CS372: {
        name: `Graphics`,
        teachers: ['SKM'],
    },
    CS392: {
        name: `Secure System design`,
        teachers: ['SM'],
    },
    CS399: {
        name: `Seminar`,
        teachers: ['JM'],
    },
    CS508: {
        name: `Formal Methods for Analysis`,
        teachers: ['ABM', 'RH', 'SKM', 'SKD'],
    },
    CS511: {
        name: `Foundation of Theoretical Computer Science`,
        teachers: ['AE', 'RH'],
    },
    CS514: {
        name: `Design & Analysis of Algorithms`,
        teachers: ['ABM'],
    },
    CS515: {
        name: `Computer System Lab 2`,
        teachers: ['SM'],
    },
    CS551: {
        name: `Deep Learning`,
        teachers: ['JC'],
    },
    CS563: {
        name: `Natural Language Processing`,
        teachers: ['AE'],
    },
    CS565: {
        name: `Cloud Computing`,
        teachers: ['RM'],
    },
    CS566: {
        name: `Adv.  Machine Learning`,
        teachers: ['SS', 'AE'],
    },
    CS575: {
        name: `Applied Time Series Analysis`,
        teachers: ['MA', 'JM'],
    },
    CS579: {
        name: `Cyber Security with Blockchain`,
        teachers: ['ST'],
    },
    CS592: {
        name: `Seminar`,
        teachers: ['SKM'],
    },
    MC504: {
        name: `Data Structures & Algorithm Lab`,
        teachers: ['ABM'],
    },

}

