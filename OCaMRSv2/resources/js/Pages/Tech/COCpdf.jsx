import React from "react";
import {
    Page,
    Text,
    Document,
    StyleSheet,
    View,
    Font,
    Image,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
    family: "Georgia",
    src: "/fonts/georgia.ttf",
});
Font.register({
    family: "Cambria Math",
    src: "/fonts/cambria-math.ttf",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIAL.ttf",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIALBD 1.ttf",
    fontWeight: "bold",
});
Font.register({
    family: "Arial",
    src: "/fonts/ARIALI.ttf",
    fontStyle: "italic",
});

// Create styles for common elements
const styles = StyleSheet.create({
    // ... existing styles ...
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
    },
    headerText: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Georgia",
        marginTop: 10,
    },
    subHeaderText: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "Cambria Math",
        marginTop: 0, // Set marginTop to 0
    },
    logo: {
        width: 70,
        height: 70,
    },
    textStyle: {
        fontSize: 9,
    },
    underline: {
        borderBottomWidth: 1,
        flex: 1,
        marginLeft: 5,
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftSection: {
        width: "65%",
        flexDirection: "row",
        alignItems: "center",
    },
    alignRight: {
        textAlign: "right",
    },
    underlineFull: {
        borderBottomWidth: 1,
        flex: 1,
        marginLeft: 5,
    },
    rightSection: {
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
    },
    tableContainer: {
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: "row",
        alignItems: "center",
        height: 20, // Adjust height for the header as needed
        backgroundColor: "#d9d9d9", // Background color for the header
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000", // Unified border color
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center", // Ensure vertical alignment
        justifyContent: "center", // Ensure horizontal alignment
        height: 20, // Adjust height as needed
        textAlign: "center",
        fontSize: 11,
        borderBottomWidth: 1,
        borderColor: "#000", // Border for rows
        borderLeftWidth: 1, // Ensure left border is present
        borderRightWidth: 1, // Ensure right border is present
        backgroundColor: "#FFF2CC",
        justifyContent: "center", // Ensure content is centered
        display: "flex", // Use flex for the column to apply centering
    },
    tableColHeader1: {
        width: "50%",
        height: "100%",
        textAlign: "center",
        fontWeight: "bold",

        fontSize: 9,
        paddingVertical: 4,
        borderRightWidth: 1,
        borderRightColor: "#000",
        backgroundColor: "#FFF2CC",
    },
    tableCol1: {
        width: "50%",
        height: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 9,
        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
    },
    tableColHeader2: {
        width: "25%",
        height: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontWeight: "bold",
        fontSize: 9,
        paddingVertical: 4,
        borderRightWidth: 1,
        borderRightColor: "#000",
        backgroundColor: "#FFF2CC",
    },
    tableCol2: {
        width: "33.33%", // Adjust width for three columns
        height: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 9,
        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
    },
    tableColHeader3: {
        width: "33.33%",
        height: "100%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 12,
        paddingVertical: 4,
        borderRightWidth: 1,
        borderRightColor: "#000",
        backgroundColor: "#ffffff",
    },
    tableCol3: {
        width: "33.33%",
        height: "100%",
        textAlign: "center",
        fontSize: 11,
        paddingVertical: 4,
        borderRightWidth: 1, // Ensure right border is present
        borderColor: "#000", // Ensure border color is consistent
        justifyContent: "center", // Ensure horizontal alignment
        alignItems: "center", // Ensure vertical alignment
        backgroundColor: "#ffffff",
    },
    lastCol: {
        borderRightWidth: 0, // No border for the last column
    },
    calibrationContainer: {
        border: "1px solid black", // Border around the container
        padding: 10, // Padding inside the container
    },
    calibrationHeader: {
        fontWeight: "bold", // Bold header
        fontSize: 12, // Font size for the header
        marginBottom: 5, // Space below the header
        marginTop: 10,
    },
    calibrationText: {
        fontSize: 11, // Font size for the text
        lineHeight: 1.5, // Line height for better readability
    },
});

const COCpdf = () => {
    return (
        <Document>
            <Page size={[8.5 * 72, 13 * 72]}>
                <View style={styles.headerContainer}>
                    <Image
                        src="/images/UstLogo.png"
                        style={[styles.logo, { marginLeft: 50 }]}
                    />
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.headerText}>
                            U&nbsp;N&nbsp;I&nbsp;V&nbsp;E&nbsp;R&nbsp;S&nbsp;I&nbsp;T&nbsp;Y&nbsp;
                            &nbsp;O&nbsp;F&nbsp;
                            &nbsp;S&nbsp;A&nbsp;N&nbsp;T&nbsp;O&nbsp;
                            &nbsp;T&nbsp;O&nbsp;M&nbsp;A&nbsp;S
                        </Text>
                        <Text style={styles.subHeaderText}>
                            LABORATORY EQUIPMENT AND SUPPLIES OFFICE
                        </Text>
                    </View>
                    <Image
                        src="/images/LesoLogo.jpg"
                        style={[styles.logo, { marginRight: 50 }]}
                    />
                </View>

                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 15,
                        fontFamily: "Arial",
                        fontWeight: "bold",
                    }}
                >
                    CERTIFICATE OF CALIBRATION
                </Text>

                <View style={{ marginLeft: 60, marginRight: 60 }}>
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            {" "}
                            {/* Use tableRow for the header as well */}
                            <Text style={[styles.tableColHeader1]}>
                                Calibration Certificate No.
                            </Text>
                            <Text
                                style={[styles.tableColHeader1, styles.lastCol]} // Ensure this is consistent with styles
                            >
                                Row 1, Col 2
                            </Text>
                        </View>
                        {/* Table Rows */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol1}>
                                Laboratory (College / Department)
                            </Text>
                            <Text style={[styles.tableCol1, styles.lastCol]}>
                                Row 2, Col 2
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol1}>
                                Laboratory Location
                            </Text>
                            <Text style={[styles.tableCol1, styles.lastCol]}>
                                Row 3, Col 2
                            </Text>
                        </View>
                    </View>
                    {/* Second Table (4 columns, 5 rows) */}
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableColHeader2}>
                                Equipment
                            </Text>
                            <Text style={styles.tableColHeader2}>Column 2</Text>
                            <Text style={styles.tableColHeader2}>
                                Date Received
                            </Text>
                            <Text
                                style={[styles.tableColHeader2, styles.lastCol]}
                            >
                                Column 4
                            </Text>
                        </View>

                        {/* Table Rows */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>Manufacturer</Text>
                            <Text style={styles.tableCol2}>Row 1, Col 2</Text>
                            <Text style={styles.tableCol2}>
                                Date Calibrated
                            </Text>
                            <Text style={[styles.tableCol2, styles.lastCol]}>
                                Row 1, Col 4
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>Model No.</Text>
                            <Text style={styles.tableCol2}>Row 2, Col 2</Text>
                            <Text style={styles.tableCol2}>
                                Recommended Due Date
                            </Text>
                            <Text style={[styles.tableCol2, styles.lastCol]}>
                                Row 2, Col 4
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>Serial No.</Text>
                            <Text style={styles.tableCol2}>Row 3, Col 2</Text>
                            <Text style={styles.tableCol2}>
                                Place of Calibration
                            </Text>
                            <Text style={[styles.tableCol2, styles.lastCol]}>
                                Row 3, Col 4
                            </Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol2}>dsada</Text>
                            <Text style={styles.tableCol2}>Row 4, Col 2</Text>
                            <Text style={styles.tableCol2}>Job Order No.</Text>
                            <Text style={[styles.tableCol2, styles.lastCol]}>
                                Row 4, Col 4
                            </Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.calibrationHeader,
                            { textDecoration: "underline" },
                        ]}
                    >
                        Calibration Procedure and Traceability:
                    </Text>
                    <View style={styles.calibrationContainer}>
                        <Text style={styles.calibrationText}>
                            Above equipment has been calibrated using STANDARD
                            CALIBRATION WEIGHTS designed for highly precise
                            calibration and adjustment of electronics balances.
                        </Text>
                    </View>
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableColHeader3}>
                                Standard Used
                            </Text>
                            <Text style={styles.tableColHeader3}>
                                Calibration Certificate No.
                            </Text>
                            <Text
                                style={[styles.tableColHeader3, styles.lastCol]}
                            >
                                Issuing Laboratory
                            </Text>
                        </View>

                        {/* Row 1 */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol3}></Text>
                            <Text style={styles.tableCol3}></Text>
                            <Text
                                style={[styles.tableCol3, styles.lastCol]}
                            ></Text>
                        </View>
                    </View>

                    <Text
                        style={[
                            styles.calibrationHeader,
                            { textDecoration: "underline" },
                        ]}
                    >
                        Calibration Results:
                    </Text>
                    <View style={styles.calibrationContainer}>
                        <Text style={styles.calibrationText}></Text>
                    </View>

                    <Text
                        style={[
                            styles.calibrationHeader,
                            { textDecoration: "underline" },
                        ]}
                    >
                        Remarks:
                    </Text>
                    <View style={styles.calibrationContainer}>
                        <Text style={styles.calibrationText}>
                            EQUIPMENT CALIBRATION / ROUTINE MAINTENANC
                        </Text>
                    </View>
                </View>

                <Text
                    style={[
                        styles.alignRight,
                        styles.textStyle,
                        {
                            marginBottom: 30, // Corrected typo here
                            marginTop: 30,
                            fontFamily: "Arial",
                            fontStyle: "italic",
                        },
                    ]}
                >
                    UST:S022-00-FO34 rev01 05/02/23
                </Text>

                <Image
                    src="/images/COCFooter.png"
                    style={[
                        styles.logo,
                        { width: "100%", height: "auto", marginTop: 30 },
                    ]} // Updated to full width
                />
            </Page>
        </Document>
    );
};

export default COCpdf;
