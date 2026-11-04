import { getDb } from '../../../db';
import { requests, events } from '../../../db/schema';
import { eq, and } from 'drizzle-orm';
import { bookingSchema,sameOrigin } from '../../../lib/service';
export async function POST(req:Request){
 if(!sameOrigin(req))return Response.json({error:'Origin rejected'},{status:403});
 if(Number(req.headers.get('content-length')||0)>5000)return Response.json({error:'Request too large'},{status:413});
 try{const raw=await req.text();if(raw.length>5000)return Response.json({error:'Request too large'},{status:413});const p=bookingSchema.safeParse(JSON.parse(raw));if(!p.success)return Response.json({error:'Vui lòng kiểm tra thông tin / Please check the form.'},{status:400});
 const {consent,website,...data}=p.data; const id='DAD-'+crypto.randomUUID().slice(0,8).toUpperCase(),secret=crypto.randomUUID(),now=new Date().toISOString(); const db=getDb();
 await db.batch([db.insert(requests).values({...data,id,secret,status:'pending',created:now,updated:now}),db.insert(events).values({id:crypto.randomUUID(),requestId:id,status:'pending',actor:'passenger',at:now})]);
 return Response.json({id,secret,status:'pending'},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch(e){console.error('booking_create_failed');return Response.json({error:'Chưa lưu được yêu cầu. Vui lòng thử lại / Unable to save. Please retry.'},{status:503});}}
export async function GET(req:Request){const u=new URL(req.url),id=u.searchParams.get('id'),secret=req.headers.get('x-booking-secret');if(!id||!secret)return Response.json({error:'Missing reference or access key'},{status:400});try{const rows=await getDb().select({id:requests.id,name:requests.name,flight:requests.flight,date:requests.date,time:requests.time,bags:requests.bags,status:requests.status}).from(requests).where(and(eq(requests.id,id),eq(requests.secret,secret))).limit(1);return Response.json(rows[0]||{error:'Không tìm thấy / Not found'},{status:rows.length?200:404,headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'Service unavailable'},{status:503});}}
export async function PATCH(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});try{const {id}=await req.json(),secret=req.headers.get('x-booking-secret');if(typeof id!=='string'||!secret)return new Response(null,{status:400});const db=getDb();const r=await db.update(requests).set({status:'cancelled',updated:new Date().toISOString()}).where(and(eq(requests.id,id),eq(requests.secret,secret),eq(requests.status,'pending'))).returning({id:requests.id});return Response.json(r.length?{ok:true}:{error:'Chỉ hủy trực tuyến khi đang chờ xác nhận. Liên hệ quầy để thay đổi yêu cầu đã xác nhận.'},{status:r.length?200:409});}catch{return Response.json({error:'Service unavailable'},{status:503});}}
