import { ProjectSvg, UsersComponentSvg } from '../../Data/svgIcons';
import {createBreakpoint} from "react-use";

const MenuChecked = localStorage.getItem('Role');

export let MENUITEMS =

    MenuChecked === "Admin" ?
        [
            {
                menutitle: 'operations',
                Items: [
                    {
                        title: 'عملیات', icon: UsersComponentSvg, type: 'sub', active: true,
                        children: [
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsMaskanMehr/`,
                                title: 'مشخصات مسکن مهر',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/NewReceiverFacility/`,
                                title: 'تسهیلات گیرنده جدید',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsSystemFacilities/`,
                                title: 'مشخصات تسهیلات سیستمی',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/ReceiveTheDeathFile/`,
                                title: 'قرارداد های مسکن مهر',
                                type: 'link'
                            },
                        ]
                    },
                ]
            },
            {
                menutitle: 'Cheque',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/Cheque/`,
                        icon: ProjectSvg,
                        title: 'چک ها',
                        type: 'link'
                    }
                ]
            },
            {
                menutitle: 'reports',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`,
                        icon: ProjectSvg,
                        title: 'گزارشات پرونده های خسارت',
                        type: 'link'
                    }
                ]
            },
            {
                menutitle: 'users',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/UserManagement/`,
                        icon: UsersComponentSvg,
                        title: 'لیست کاربران',
                        type: 'link'
                    }
                ]
            },
        ]

    :
    MenuChecked === "Expert" ?
        [
            {
                menutitle: 'operations',
                Items: [
                    {
                        title: 'عملیات', icon: UsersComponentSvg, type: 'sub', active: true,
                        children: [
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsMaskanMehr/`,
                                title: 'مشخصات مسکن مهر',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/NewReceiverFacility/`,
                                title: 'تسهیلات گیرنده جدید',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsSystemFacilities/`,
                                title: 'مشخصات تسهیلات سیستمی',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/ReceiveTheDeathFile/`,
                                title: 'قرارداد های مسکن مهر',
                                type: 'link'
                            },
                        ]
                    },
                ]
            },
            {
                menutitle: 'Cheque',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/Cheque/`,
                        icon: ProjectSvg,
                        title: 'چک ها',
                        type: 'link'
                    }
                ]
            },
            {
                menutitle: 'reports',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`,
                        icon: ProjectSvg,
                        title: 'گزارشات پرونده های خسارت',
                        type: 'link'
                    }
                ]
            },
        ]

    :
    MenuChecked === "BranchesManager" ?
        [
            {
                menutitle: 'operations',
                Items: [
                    {
                        title: 'عملیات', icon: UsersComponentSvg, type: 'sub', active: true,
                        children: [
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsMaskanMehr/`,
                                title: 'مشخصات مسکن مهر',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/NewReceiverFacility/`,
                                title: 'تسهیلات گیرنده جدید',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/SpecificationsSystemFacilities/`,
                                title: 'مشخصات تسهیلات سیستمی',
                                type: 'link'
                            },
                            {
                                path: `${process.env.PUBLIC_URL}/dashboard/operations/ReceiveTheDeathFile/`,
                                title: 'قرارداد های مسکن مهر',
                                type: 'link'
                            },
                        ]
                    },
                ]
            },
            {
                menutitle: 'reports',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`,
                        icon: ProjectSvg,
                        title: 'گزارشات پرونده های خسارت',
                        type: 'link'
                    }
                ]
            },
        ]

    :
    MenuChecked === "AccountingOffice" ?
        [
            {
                menutitle: 'reports',
                Items: [
                    {
                        path: `${process.env.PUBLIC_URL}/dashboard/reports/ReportsDamageCases/`,
                        icon: ProjectSvg,
                        title: 'گزارشات پرونده های خسارت',
                        type: 'link'
                    }
                ]
            },
        ]

    :
        createBreakpoint()
