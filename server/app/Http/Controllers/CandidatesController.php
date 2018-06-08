<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Dingo\Api\Routing\Helpers;
use App\Candidate;

class CandidatesController extends Controller
{
  use Helpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Candidate::orderBy('updated_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $payload = $request->only(['email', 'name', 'mobileNumber']);

        $rules = [
                    'email' => ['required', 'email', 'unique:candidates'],
                    'name' => ['required'],
                    'mobileNumber' => ['required', 'phone:BR']
                ];

        $validator = app('validator')->make($payload, $rules);

        if ($validator->fails()) {
            throw new \Dingo\Api\Exception\StoreResourceFailedException('Could not create new Candidate.', $validator->errors());
        }

        Candidate::create($payload);
        return $this->response->created();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
   	{

      try {
        $candidate = Candidate::findOrFail($id);
      } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
      }
   		return $candidate;
   	}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      try {
        $candidate = Candidate::findOrFail($id);
      } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
      }

      $payload = $request->all();

      $rules = [
                  'email' => ['required', 'email', 'unique:candidates,email,'.$candidate->id],
                  'name' => ['required'],
                  'mobileNumber' => ['required', 'phone:BR']
              ];

      $validator = app('validator')->make($payload, $rules);

      if ($validator->fails()) {
          throw new \Dingo\Api\Exception\UpdateResourceFailedException('Could not update Candidate.', $validator->errors());
      }

      $candidate->email = $request->email;
      $candidate->name = $request->name;
      $candidate->mobileNumber = $request->mobileNumber;
      $candidate->save();

      return $this->response->noContent();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        $candidate = Candidate::findOrFail($id);
      } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $ex) {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
      }

      $candidate->delete();
      return $this->response->noContent();

    }
}
