import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink,Font } from '@react-pdf/renderer';
import DateFormart from '../Base/DateFormart';



Font.register({
  family: 'Roboto',
 fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold'
    }
  ]
});
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    fontFamily:'Roboto',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  shopName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  shopAddress: {
    fontSize: 10,
    fontFamily:'Roboto',
    fontStyle: 'italic',
  },
  shopInfo: {
    fontSize: 9,
    fontFamily:'Roboto',
  },
  invoiceTitle: {
    fontSize: 16,
    fontFamily:'Roboto',
    color:"blue",
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  invoiceInfo: {
    flexWrap:"wrap",
    fontSize:13,
    flexDirection: 'row',
    fontFamily:'Roboto',
    justifyContent: 'space-between',
    marginBottom: 10,
    color:"gray"
  },
  infoUser:{
    fontSize:13,
    flexDirection: 'col',
    fontFamily:'Roboto',
    gap:2,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    color:"white",
    backgroundColor:"green",
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  col1: {
    width: '10%',
    fontSize:12,
    textAlign:"center"
  },
  col2: {
    width: '20%',
    textAlign: 'left',
    fontSize:12,
  },
  col3: {
    width: '20%',
     fontSize:12,
    textAlign: 'center',
  },
  col4: {
    width: '20%',
     fontSize:12,
    textAlign: 'center',
  },
  col5: {
    width: '20%',
     fontSize:12,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    fontSize:14
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginVertical: 10,
  },
  footer: {
    marginTop: 10,
    fontSize: 9,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  rightAlign: {
    textAlign: 'right',
  },
});

const Invoice = ({detail,product}) => (
  <Document>
    <Page  size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.shopName}>Haui Food</Text>
          <Text style={styles.shopAddress}>Địa chỉ: 214 Minh Khai - Đường Cầu Diễn - Thành phố Hà Nội </Text>
          <Text style={styles.shopInfo}>Số điện thoại: +84 972685517</Text>
        </View>
      </View>

      {product.map((item,index)=>{
        console.log("Oke "+ index+"\n");
      })}

      {/* Invoice title */}
      <Text style={styles.invoiceTitle}>HÓA ĐƠN BÁN HÀNG</Text>
      {/* <Text style={[styles.invoiceTitle, {fontSize: 14}]}>HD001749</Text> */}

      {/* Invoice info */}
      <View style={styles.invoiceInfo}>
        <Text>Mã hóa đơn: {detail.orderCode}</Text>
        <Text>Ngày đặt hàng: {<DateFormart value={detail.orderDate}/>}</Text>
       
      </View>

      <View style={styles.infoUser}>
        <Text>Họ tên: {detail?.fullName}</Text>
        <Text>Địa chỉ: {detail?.address}</Text>
        <Text>Số điện thoại: {detail?.phoneNumber}</Text>
        <Text>Hình thức thanh toán: {detail?.payMethod=="TIENMAT"?"Thanh toán khi nhận hàng":"Chuyển khoản"}</Text>
        <Text>Trạng thái thanh toán : {detail?.paymentStatus?"Đã thanh toán":"Chưa thanh toán"}</Text>
      </View>
      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={styles.col1}>STT</Text>
        <Text style={styles.col2}>Tên sản phẩm</Text>
        <Text style={styles.col3}>Số lượng</Text>
        <Text style={styles.col4}>Giá bán</Text>
        <Text style={styles.col5}>Topping</Text>
        <Text style={styles.col5}>Thành tiền</Text>
      </View>

      {/* Table rows */}
      {product&&product.map((item,index)=>(
      <View style={styles.tableRow}>
        <Text style={styles.col1}>{index+1}</Text>
        <Text style={styles.col2}>{item?.product?.name}</Text>
        <Text style={styles.col3}>{item?.quantity}</Text>
        <Text style={styles.col4}>{item.priceItem.toLocaleString()}</Text>
        <Text style={styles.col4}>Không có</Text>
        <Text style={styles.col4}>{item.subPrice.toLocaleString()}</Text>
      </View>
      ))}
     

      
      {/* Summary */}
      <View style={styles.divider} />
      <View style={styles.summaryRow}>
        <Text>Tạm tính</Text>
        <Text>
            {product.reduce((total, item) => total + item.subPrice, 0).toLocaleString()} đ
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <Text>Giảm giá</Text>
        <Text>0 đ</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text>Phí vận chuyển</Text>
        <Text>{detail.shippingFee>0?detail.shippingFee.toLocaleString():0} đ</Text>
      </View>

      <View style={[styles.summaryRow, styles.bold]}>
        <Text>TỔNG CỘNG</Text>
        <Text>{(detail.totalAmount).toLocaleString()} đ</Text>
      </View>
    
      <View style={[styles.summaryRow, styles.bold]}>
        <Text>Khách phải trả</Text>
        <Text>{detail?.paymentStatus?"0 đ":(detail.totalAmount).toLocaleString()} đ</Text>
      </View>
       {/* <View style={styles.summaryRow}>
        <Text>Trạng thái thanh toán:</Text>
        <Text>Đã thanh toán</Text>
      </View> */}
     

      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.bold}>Cảm ơn quý khách đã đặt hàng</Text>
        <Text>Trần Xuân Mạnh - 0972685517 - MB: 0972685517</Text>
        {/* <Text style={[styles.bold, {marginTop: 5}]}>CHI NHÁNH: CHI NHÁNH SÀI GÒN</Text>
        <Text>TIỀU KIỂU: NGUYỄN HÀNH PHÚC</Text> */}
        <Text style={{marginTop: 10}}>Hẹn gặp lại quý khách</Text>
      </View>
    </Page>
  </Document>
)
export default function ExportPDF({detail,product}) {
  return (
    <div>
      <PDFDownloadLink
        document={<Invoice detail={detail} product={product} />}
        fileName={`${detail.orderCode}.pdf`}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
          textDecoration: 'none',
          borderRadius: 5,
        }}
      >
        {({ loading }) => (loading ? 'Đang tạo file...' : 'In đơn hàng')}
      </PDFDownloadLink>
    </div>
  );
}
