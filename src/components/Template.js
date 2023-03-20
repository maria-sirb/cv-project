import React, {Component} from "react";
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink, PDFViewer, Svg, Path, Polygon} from "@react-pdf/renderer";


import "./css/App.css"
import { skillsMap } from "../skillsMap";
export class Template extends Component{

    constructor (props)
    {
        super(props);
        this.styles = StyleSheet.create({

            text : {
                "color": "blue",
                
            },
            image : {
                height: "120",
                width : "120",
                "borderRadius" : "100",
                "backgroundColor" : "white",
                "alignSelf" : "center"

            },
            page : {

                "color" : "rgb(20, 20, 20)"   
            },
            pdfViewer : {
                "minHeight" : "90vh",
                "width" : "70vw"
            },
            title : {
                "fontWeight" : "bold",
                "fontSize" : "18",
                "textTransform" : "uppercase",
                "textAlign" : "center"

            },
            section : {
                "fontSize" : "12",
                "borderTop" : "1px solid rgb(120, 120, 120)",
                "padding" : "10px",
                "fontWeight" : "normal"
            },
            leftSection : {
                "fontSize" : "11",
                "borderTop" : "1px solid rgb(50, 50, 50)",
                "padding" : "10px"
            },
            personalDetail : {
                "color" : "rgb(50, 50, 50)",
                "marginRight" : "-10px"       
            },
            smallHeader : {
                "fontSize" : "12",
                "marginTop" : "10px",
                "marginBttom" : "5px" 
               
            },
            header : {
                "fontSize" : "14",
                "marginTop" : "15px",
                "paddingBottom" : "5px"
            },
            leftHeader : {
                "fontSize" : "14",
                "marginTop" : "10px",
                
            },
            
            personalInfo : {
                "display" : "flex",
                "flexDirection" : "column",
            
            },
            content :{
                "display" : "flex",
                "flexDirection" : "row",
                "justifyContent" : "space-between",
                "minHeight" : "100%"
                
            },
            leftCol : {
                "width" : "30vw",
                "backgroundColor" : "rgb(191, 189, 189)",
                "minHeight" : "100%",
                "padding" : "10px",
                
            },
            rightCol : {
                "width" : "65vw",
                "padding" : "10px",
                "paddingLeft" : "0px",
                
            },
            experience : {
                "display" : "flex",
                "flexDirection" : "row",
                "justifyContent" : "flex-start",
                "alignItems" : "flex-start",
                "gap" : "20px",
                "marginTop" : "10px"
            },
            experienceTitle : {
                "fontWeight" : "bold",
                "textTransform" : "capitalize",
            },
            detail : {
                "color" : "rgb(120, 151, 177)"
            },
            date : {
                "color" : "rgb(90, 90, 90)"
            },
            skill : {
                "display" : "flex",
                "flexDirection" : "row",
                "justifyContent" : "flex-start",
                "alignItems" : "center",
                "gap" : "100px"
            },
            skillLevel : {
                "display" : "flex",
                "flexDirection" : "row",
                "margin" : "5px"
            },
            skillName : {
                "minWidth" : "80px",
                "margin" : "5px"
            }

        })

    }

    render()
    {
        console.log(this.props.education);
        let MyDocument = (<Document>
            <Page size = "A4" style = {this.styles.page}>
                <View style = {this.styles.content}>
                    <View style = {this.styles.leftCol}>
                        <Image style = {this.styles.image} src = {this.props.personal.photo} alt = "profile image"></Image>
                        <Text style = {this.styles.leftHeader}>PERSONAL</Text>
                        <View style = {this.styles.leftSection}>
                            <View style = {this.styles.personalInfo}>
                                <Text style = {this.styles.smallHeader}>Name</Text>
                                <Text style = {this.styles.personalDetail}>{this.props.personal.firstName} {this.props.personal.lastName}</Text>
                                <Text style = {this.styles.smallHeader}>Email</Text>
                                <Text style = {this.styles.personalDetail}>{this.props.personal.email}</Text>
                                {
                                    (this.props.personal.phone) ?
                                    <View>
                                        <Text style = {this.styles.smallHeader}>Phone</Text>
                                        <Text style = {this.styles.personalDetail}>{this.props.personal.phone}</Text>
                                    </View>: null
                                }
                                {
                                    (this.props.personal.address) ?
                                    <View>
                                        <Text style = {this.styles.smallHeader}>Address</Text>
                                        <Text style = {this.styles.personalDetail}>{this.props.personal.address}</Text>
                                        <Text style = {this.styles.personalDetail}>{this.props.personal.city}</Text>
                                    </View> : null
                                }
                                
                            </View>
                        </View>
                    </View>
                    <View style = {this.styles.rightCol}>
                        <Text style = {this.styles.title}>{this.props.personal.firstName} {this.props.personal.lastName}</Text>
                        <Text  style = {this.styles.header}>EDUCATION</Text>
                        <View  style = {this.styles.section}>
                        
                            {
                                this.props.education.map(education => {
                                    return (
                                    <View style = {this.styles.experience}>
                                        <Text style = {this.styles.date}>{education.startMonth.slice(0, 3)} {education.startYear} - {education.endMonth.slice(0, 3)} {education.endYear}</Text>
                                        <View>
                                            <Text style = {this.styles.experienceTitle}>{education.degree}</Text>
                                            <Text style = {this.styles.detail}>{education.school}, {education.city}</Text>
                                        </View>
                                    </View>)
                                })
                            }
                        </View>
                        <Text  style = {this.styles.header}>WORK EXPERIENCE</Text>
                        <View  style = {this.styles.section}>
                            
                            {
                                this.props.work.map(work => {
                                    return (
                                    <View style = {this.styles.experience}>
                                        <Text style = {this.styles.date}>{work.startMonth.slice(0, 3)} {work.startYear} - {work.endMonth.slice(0, 3)} {work.endYear}</Text>
                                        <View>
                                            <Text style = {this.styles.experienceTitle}>{work.job}</Text>
                                            <Text style = {this.styles.detail}>{work.employer}, {work.city}</Text>
                                        </View>
                                    </View>)
                                })
                            }
                        </View>
                        <Text  style = {this.styles.header}>SKILLS</Text>
                        
                        <View  style = {this.styles.section}>
                            {
                                this.props.skills.map(skill => {
                                    let skillNumber = skillsMap[skill.level];
                                    let skillLevels = [1, 2, 3, 4, 5];
                                    return(
                                        <View style = {this.styles.skill}>
                                            <View style = {this.styles.skillName}>
                                                <Text >{skill.skill}</Text>
                                            </View>
                                           <View style = {this.styles.skillLevel}>
                                            {
                                                skillLevels.map(level => {
                                                    return(

                                                    (level <= skillNumber) ? 
                                                    (
                                                        <Svg key = {level} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width = "10px" height = "10px"><Path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" fill = "rgb(120, 151, 177)"/></Svg>
                                                       
                                                    ) : 
                                                    (
                                                        <Svg key = {level} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width = "10px" height = "10px"><Path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" fill = "rgb(120, 151, 177)"/></Svg>
                                                    ))
                                                })
                                            }
                                           </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </Page>
        </Document>);

        return(
            <div className="step">
                <PDFViewer style = {this.styles.pdfViewer}>{MyDocument}</PDFViewer>
                <div>
                    <PDFDownloadLink document={MyDocument} fileName="resume.pdf">
                         {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download resume')}
                    </PDFDownloadLink>
                </div>
            </div>
        )
    }
    

}