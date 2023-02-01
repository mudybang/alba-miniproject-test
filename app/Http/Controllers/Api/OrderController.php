<?php
namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Midtrans\Snap;
use Midtrans\Config;

class OrderController extends Controller{
    public function __construct(){
        $this->serverKey = config('midtrans.server_key');
        $this->isProduction = config('midtrans.is_production');
        $this->isSanitized = config('midtrans.is_sanitized');
        $this->is3ds = config('midtrans.is_3ds');

        $this->_configureMidtrans();
    }
    public function _configureMidtrans(){
        Config::$serverKey = $this->serverKey;
        Config::$isProduction = $this->isProduction;
        Config::$isSanitized = $this->isSanitized;
        Config::$is3ds = $this->is3ds;
    }
    public function index(){
        $data=Order::get();
        $data_=[];
        foreach($data as $row){
            $data_[]=$row;
        }

        //$results=array_merge($result,array('rows'=>BusinessResource::collection($data_),'sql'=>$data->toSql()));
		return response()->json($data_);
    }

    public function store(Request $request){
        $number=(Order::max('number'))+1;
        $order=Order::create([
            'number' => $number,
            'total_price' => $request->total_price,
            'payment_status' => 1,
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $order->number,
                'gross_amount' => $order->total_price,
            ],
            'item_details' => [
                [
                    'id' => 1,
                    'price' => $order->total_price,
                    'quantity' => 1,
                    'name' => $request->item_name,
                ],
            ],
            'customer_details' => [
                'first_name' => 'Bagoes S',
                'email' => 's.bagoes@gmail.com',
                'phone' => '082112602600',
            ]
        ];
        $snapToken = Snap::getSnapToken($params);
        $order->snap_token = $snapToken;
        $order->save();
        return response()->json([
            'message' => 'Create Success',
            'data' => $order,
            'snapToken' => $snapToken,
        ]);
    }

    public function update(Request $request, Order $Order){
        $Order->title = $request->title;
        $Order->slug = \Str::slug($request->title);
        $Order->content = $request->content;
        $Order->categories = $request->categories;
        $Order->tags = $request->tags;
        $Order->save();
        return response()->json([
            'message' => 'Update Success',
            'raw' => $Order,
        ]);
    }

    public function destroy(Order $Order){
        $Order->delete();
    }
}
